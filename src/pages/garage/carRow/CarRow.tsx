import './CarRow.scss';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { CarIcon } from './CarIcon';
import {
  useStartEngineMutation,
  useDriveEngineMutation,
  useStopEngineMutation,
} from '../../../services/carsApi';
import type { Car, CarRowHandle } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { resetWinner } from '../../../store/winnersSlice';
import { declareWinnerIfEmpty } from '../../../store/winnersThunks';

type Props = {
  car: Car;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
};

export const CarRow = forwardRef<CarRowHandle, Props>(({ car, onSelect, onDelete }, ref) => {
  const laneRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<Animation | null>(null);
  const runIdRef = useRef(0); // invalidates older runs for THIS row
  const drivePromiseRef = useRef<ReturnType<typeof driveEngine> | null>(null); // holds the mutation promise

  const [startEngine] = useStartEngineMutation();
  const [driveEngine] = useDriveEngineMutation();
  const [stopEngine] = useStopEngineMutation();
  const dispatch = useAppDispatch();
  const selectedCarId = useAppSelector((state) => state.garage.selectedCarId);

  const [isStarting, setIsStarting] = useState(false);
  const [isDriving, setIsDriving] = useState(false);
  const [isBroken, setIsBroken] = useState(false);
  const [atStart, setAtStart] = useState(true);

  const start = useCallback(async () => {
    if (isStarting || isDriving || isBroken) return;
    const myRunId = ++runIdRef.current;
    try {
      setIsBroken(false);
      setIsStarting(true);

      const { velocity, distance } = await startEngine(car.id).unwrap();
      const laneW = laneRef.current?.clientWidth ?? 0;
      const carW = carRef.current?.clientWidth ?? 0;
      const maxX = Math.max(0, laneW - carW);
      const durationMs = Math.max(300, Math.round(distance / velocity));
      const time = durationMs / 1000;

      if (carRef.current) {
        animRef.current?.cancel();
        animRef.current = carRef.current.animate(
          [{ transform: 'translateX(0)' }, { transform: `translateX(${maxX}px)` }],
          { duration: durationMs, easing: 'linear', fill: 'forwards' },
        );
        setAtStart(false);
      }

      setIsStarting(false);
      setIsDriving(true);

      const p = driveEngine(car.id); // don't unwrap yet; keep the abort handle
      drivePromiseRef.current = p;

      p.unwrap()
        .then(() => {
          if (myRunId !== runIdRef.current) return;
          dispatch(declareWinnerIfEmpty({ id: car.id, name: car.name, time }));
        })
        .catch((err) => {
          if (err?.originalStatus === 500) {
            setIsBroken(true);
            setIsDriving(false);
            animRef.current?.pause();
          }
        });
    } catch {
      setIsStarting(false);
      setIsDriving(false);
    }
  }, [car.id, car.name, dispatch, isStarting, isDriving, isBroken, startEngine, driveEngine]);

  const stop = useCallback(async () => {
    // 1) invalidate any pending start/drive for this row
    runIdRef.current++;
    // 2) abort the in-flight drive request (RTKQ mutation trigger supports abort())
    drivePromiseRef.current?.abort?.();
    drivePromiseRef.current = null;
    try {
      await stopEngine(car.id).unwrap();
    } finally {
      setIsDriving(false);
      setIsBroken(false);
      if (animRef.current) {
        const currentTime = animRef.current.currentTime ?? 0;
        const endTime = animRef.current.effect?.getTiming().duration as number;
        animRef.current.pause();

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
                setAtStart(true);
              },
              { once: true },
            );
          });
        }
        animRef.current.cancel();
        animRef.current = null;
      } else if (carRef.current) {
        carRef.current.style.transform = 'translateX(0)';
        setAtStart(true);
      }
      dispatch(resetWinner());
    }
  }, [car.id, stopEngine]);

  useImperativeHandle(ref, () => ({ start, stop }), [start, stop]);

  useEffect(
    () => () => {
      runIdRef.current++;
      drivePromiseRef.current?.abort?.();
      animRef.current?.cancel();
    },
    [],
  );

  return (
    <div className="car-row">
      <div className="car-row-buttons">
        <div className="car-row-buttons__edit">
          <button
            className={`garage-button small ${selectedCarId === car.id ? 'green' : 'purple'}`}
            type="button"
            onClick={() => onSelect(car.id)}
          >
            Select
          </button>
          <button
            className="garage-button small red"
            type="button"
            onClick={() => onDelete(car.id)}
            disabled={isStarting || isDriving}
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
            disabled={isStarting || atStart}
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
});
