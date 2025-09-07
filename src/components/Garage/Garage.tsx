import React from 'react';
import './Garage.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { generateRandomCars } from '../../utils';
import {
  useCreateCarMutation,
  useDeleteCarMutation,
  useGetCarsQuery,
  useUpdateCarMutation,
} from '../../services/carsApi';
import { Loader } from '../Loader/Loader';
import { CarIcon } from './CarIcon';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { setName, selectColor, selectCarForEditing } from '../../store/garageSlice';

const Garage: React.FC = () => {
  const dispatch = useAppDispatch();
  const limit = 7;
  const page = useAppSelector((state) => state.garage.page);
  const selectedCarId = useAppSelector((state) => state.garage.selectedCarId);
  const color = useAppSelector((state) => state.garage.color);
  const name = useAppSelector((state) => state.garage.name);
  const { data, isFetching } = useGetCarsQuery({ page, limit });
  const cars = data?.cars ?? [];
  const total = data?.total ?? 0;
  const [createCar, { isLoading }] = useCreateCarMutation();
  const [updateCar] = useUpdateCarMutation();
  const [deleteCar] = useDeleteCarMutation();

  const handleGenerateCars = () => {
    generateRandomCars().forEach((car) => {
      createCar(car);
    });
  };

  const handleStartRace = () => {
    // cars.forEach((car) => handleStart(car.id));
  };

  const handleResetRace = () => {
    // cars.forEach((car) => handleReset(car.id));
  };

  const handleCreate = () => {
    createCar({ name, color });
  };

  const handleUpdate = () => {
    updateCar({ id: selectedCarId!, name, color });
  };

  return (
    <>
      {(isLoading || isFetching) && <Loader />}
      <div className="garage-view">
        <Header />

        <div className="garage-control-panel">
          <div className="garage-control-panel-form">
            <input
              type="text"
              value={name}
              placeholder="Type brand and model"
              onChange={(e) => dispatch(setName(e.target.value))}
            />
            <input
              type="color"
              value={color}
              onChange={(e) => dispatch(selectColor(e.target.value))}
            />
            <button onClick={handleCreate}>Create</button>
            <button onClick={handleUpdate} disabled={!selectedCarId}>
              Update
            </button>
          </div>
          <div className="garage-control-panel-controls">
            <button className="garage-button small green" onClick={handleStartRace}>
              Start Race
            </button>
            <button className="garage-button small red" onClick={handleResetRace}>
              Reset Race
            </button>
            <button className="garage-button small green" onClick={handleGenerateCars}>
              Generate cars
            </button>
          </div>
        </div>

        <div className="cars-list">
          {cars.map((car) => (
            <div className="car-item" key={car.id}>
              <div className="car-item-buttons">
                <div className="car-item-buttons__edit">
                  <button
                    className="garage-button small purple"
                    onClick={() => dispatch(selectCarForEditing(car.id))}
                  >
                    Select
                  </button>
                  <button className="garage-button small red" onClick={() => deleteCar(car.id)}>
                    Delete
                  </button>
                </div>
                <div className="car-item-buttons__engine">
                  <button className="garage-button small green" onClick={() => console.log(car.id)}>
                    Start
                  </button>
                  <button className="garage-button small red" onClick={() => console.log(car.id)}>
                    Stop
                  </button>
                </div>
              </div>
              <CarIcon color={car.color} />
              <span className="garage-text">{car.name}</span>
              <div className="garage-text">
                _____________________________________________________________________________________________________________________________________________________________________________________________
              </div>
            </div>
          ))}
        </div>

        <Footer page={page} total={total} limit={limit} />
      </div>
    </>
  );
};

export default Garage;
