import './ControlPanel.scss';
import { useAppDispatch, useAppSelector, useDebounce } from '../../../store/hooks';
import { selectColor, setName } from '../../../store/garageSlice';
import { ChangeEvent, useEffect, useState } from 'react';
import { useUpdateCarMutation } from '../../../services/carsApi';
import { generateRandomCars } from '../../../utils';
import type { Car } from '../../../types';
import { MAX_NAME_LENGTH } from '../../../constants';

type ControlPanelProps = {
  onCreate: (car: Omit<Car, 'id'>) => void | Promise<unknown>;
  onStartRace?: () => void;
  onResetRace?: () => void;
};

export const ControlPanel: React.FC<ControlPanelProps> = ({
  onCreate,
  onStartRace,
  onResetRace,
}) => {
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
        <button type="button" className="garage-button small green" onClick={onStartRace}>
          Start Race
        </button>
        <button type="button" className="garage-button small red" onClick={onResetRace}>
          Reset Race
        </button>
        <button type="button" className="garage-button small green" onClick={handleGenerateCars}>
          Generate cars
        </button>
      </div>
    </div>
  );
};
