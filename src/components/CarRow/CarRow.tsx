import './CarRow.scss';
import React, { useRef, useState } from 'react';
import { CarIcon } from './CarIcon';
import {
  useStartEngineMutation,
  useDriveEngineMutation,
  useStopEngineMutation,
} from '../../services/carsApi';
import type { Car } from '../../types';

type Props = {
  car: Car;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
};

export const CarRow: React.FC<Props> = ({ car, onSelect, onDelete }) => {
  const laneRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<Animation | null>(null); // Web Animations API handle

  const [startEngine] = useStartEngineMutation();
  const [driveEngine] = useDriveEngineMutation();
  const [stopEngine] = useStopEngineMutation();

  const [isStarting, setIsStarting] = useState(false);
  const [isDriving, setIsDriving] = useState(false);
  const [isBroken, setIsBroken] = useState(false);

  const start = async () => {
    try {
      setIsBroken(false);
      setIsStarting(true);

      // 1) Ask for velocity & distance
      const { velocity, distance } = await startEngine(car.id).unwrap();

      // 2) Compute animation distance (pixels) based on lane width
      const laneW = laneRef.current?.clientWidth ?? 0;
      const carW = carRef.current?.clientWidth ?? 0;
      const maxX = Math.max(0, laneW - carW); // px to finish line

      // The API says you can compute finish time from "started" response
      const durationMs = Math.max(300, Math.round(distance / velocity)); // linear

      // 3) Start animation (linear to the finish)
      if (carRef.current) {
        // cancel any previous animation
        animRef.current?.cancel();
        animRef.current = carRef.current.animate(
          [{ transform: 'translateX(0)' }, { transform: `translateX(${maxX}px)` }],
          { duration: durationMs, easing: 'linear', fill: 'forwards' },
        );
      }

      setIsStarting(false);
      setIsDriving(true);

      // 4) Switch engine to drive mode concurrently
      driveEngine(car.id)
        .unwrap()
        .catch((err) => {
          // If server fails with 500, stop the animation where it is
          if (err?.status === 500) {
            setIsBroken(true);
            setIsDriving(false);
            animRef.current?.pause(); // freezes at current position
          }
        });
    } catch {
      setIsStarting(false);
      setIsDriving(false);
    }
  };

  const stop = async () => {
    try {
      await stopEngine(car.id).unwrap();
    } finally {
      // Return to start smoothly
      setIsDriving(false);
      setIsBroken(false);
      if (animRef.current) {
        // Jump to current position, then animate back to 0
        const currentTime = animRef.current.currentTime ?? 0;
        const endTime = animRef.current.effect?.getTiming().duration as number;
        animRef.current.pause();
        // Apply current transform as inline style so we can animate back
        const progress = endTime ? Number(currentTime) / Number(endTime) : 0;
        const laneW = laneRef.current?.clientWidth ?? 0;
        const carW = carRef.current?.clientWidth ?? 0;
        const maxX = Math.max(0, laneW - carW);
        if (carRef.current) {
          carRef.current.style.transform = `translateX(${progress * maxX}px)`;
          carRef.current.style.transition = 'transform 350ms linear';
          requestAnimationFrame(() => {
            if (!carRef.current) return;
            carRef.current.style.transform = 'translateX(0)';
            carRef.current.addEventListener(
              'transitionend',
              () => {
                if (!carRef.current) return;
                carRef.current.style.transition = '';
                carRef.current.style.transform = '';
              },
              { once: true },
            );
          });
        }
        animRef.current.cancel();
        animRef.current = null;
      } else if (carRef.current) {
        // No running animation: just reset
        carRef.current.style.transform = 'translateX(0)';
      }
    }
  };

  return (
    <div className="car-row">
      <div className="car-row-buttons">
        <div className="car-row-buttons__edit">
          <button
            className="garage-button small purple"
            type="button"
            onClick={() => onSelect(car.id)}
          >
            Select
          </button>
          <button
            className="garage-button small red"
            type="button"
            onClick={() => onDelete(car.id)}
          >
            Delete
          </button>
        </div>
        <div className="car-row-buttons__engine">
          <button
            className="garage-button small green"
            type="button"
            onClick={start}
            disabled={isStarting || isDriving}
          >
            {isStarting ? 'Go!!!' : 'Start'}
          </button>
          <button
            className="garage-button small red"
            type="button"
            onClick={stop}
            disabled={isStarting}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="garage-track">
        <div className="garage-track__name" title={car.name}>
          {car.name}
        </div>
        <div className="garage-track__lane" ref={laneRef}>
          <div className={`garage-car ${isBroken ? 'garage-car--broken' : ''}`} ref={carRef}>
            <CarIcon color={car.color} />
          </div>
          <div className="garage-track__finish" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};
