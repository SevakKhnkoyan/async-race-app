import './ControlPanel.scss';
import { useAppDispatch, useAppSelector, useDebounce } from '../../store/hooks';
import { selectColor, setName } from '../../store/garageSlice';
import { ChangeEvent, useEffect, useState } from 'react';
import { useUpdateCarMutation } from '../../services/carsApi';
import { generateRandomCars } from '../../utils';
import type { Car } from '../../types';

type ControlPanelProps = {
  onCreate: (car: Omit<Car, 'id'>) => void | Promise<unknown>;
};

export const ControlPanel: React.FC<ControlPanelProps> = ({ onCreate }) => {
  const MAX_NAME_LENGTH = 50;
  const dispatch = useAppDispatch();
  const name = useAppSelector((state) => state.garage.name);
  const color = useAppSelector((state) => state.garage.color);
  const selectedCarId = useAppSelector((state) => state.garage.selectedCarId);
  const [updateCar] = useUpdateCarMutation();
  const [draftName, setDraftName] = useState(name);
  const isNameValid = draftName.length > 0;
  const debounced = useDebounce(draftName, 700);

  useEffect(() => {
    // Sync the debounced name to Redux so the value persists across views/routes.
    // Debouncing prevents typing glitches since dispatching to Redux is heavier than local setState.
    dispatch(setName(debounced));
  }, [debounced, dispatch]);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // single space between words; trim if only 1 char;
    // then slicing in the handler (covers paste/edge cases for extra safety)
    const withSingleSpaces = raw.length === 1 ? raw.trim() : raw.replace(/\s+/g, ' ');
    const next = withSingleSpaces.slice(0, MAX_NAME_LENGTH);
    setDraftName(next);
  };

  const handleCreate = () => {
    onCreate({ name: draftName, color });
  };

  const handleUpdate = () => {
    updateCar({ id: selectedCarId!, name: draftName, color });
  };

  const handleGenerateCars = () => {
    generateRandomCars().forEach((car) => {
      onCreate(car);
    });
  };

  const handleStartRace = () => {
    // cars.forEach((car) => handleStart(car.id));
  };

  const handleResetRace = () => {
    // cars.forEach((car) => handleReset(car.id));
  };

  return (
    <div className="garage-control-panel">
      <div className="garage-control-panel-form">
        <input
          type="text"
          className="garage-control-panel-form-input__text"
          value={draftName}
          maxLength={MAX_NAME_LENGTH}
          placeholder="Type brand and model"
          onChange={handleNameChange}
        />
        <input
          type="color"
          className="garage-control-panel-form-input__color"
          value={color}
          onChange={(e) => dispatch(selectColor(e.target.value))}
        />
        <button
          type="button"
          className="garage-button small green"
          onClick={handleCreate}
          disabled={!isNameValid}
        >
          Create
        </button>
        <button
          type="button"
          className="garage-button small green"
          onClick={handleUpdate}
          disabled={!selectedCarId || !isNameValid}
        >
          Update
        </button>
      </div>
      <div className="garage-control-panel-controls">
        <button type="button" className="garage-button small green" onClick={handleStartRace}>
          Start Race
        </button>
        <button type="button" className="garage-button small red" onClick={handleResetRace}>
          Reset Race
        </button>
        <button type="button" className="garage-button small green" onClick={handleGenerateCars}>
          Generate cars
        </button>
      </div>
    </div>
  );
};
