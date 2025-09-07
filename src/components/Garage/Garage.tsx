import React, { useState } from 'react';
import asyncRaceLogo from '../../assets/asyncRaceLogo.png';
import './Garage.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { generateRandomCars } from '../../utils';
import { useCreateCarMutation, useGetCarsQuery } from '../../services/carsApi';
import { FullPageLoader } from '../Loader/Loader';
import { goToPage } from '../../store/carsSlice';
// import { fetchCars, createCar, updateCar, deleteCar, startCarEngine, stopCarEngine } from '../store/carsSlice';

const Garage: React.FC = () => {
  const limit = 10;
  const page = useAppSelector((s) => s.cars.page)
  const { data, isFetching } = useGetCarsQuery({ page, limit });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const cars = data?.items ?? [];
  const [createCar, { isLoading }] = useCreateCarMutation();
  const [name, setName] = useState(''); // form state for car name
  const [color, setColor] = useState('#000000'); // form state for car color (default black)

  const handleGenerateCars = async () => {
    const cars = generateRandomCars();
    await Promise.all(cars.map((car) => createCar(car).unwrap()));
  };


  const handleStartRace = () => {
    // cars.forEach((car) => handleStart(car.id));
  };

  const handleResetRace = () => {
    // cars.forEach((car) => handleReset(car.id));
  };

  return (
    <>
      {(isLoading || isFetching) && <FullPageLoader />}
      <div className="garage-view">
        <div className="garage-header">
          <h2 className="garage-title">Garage</h2>
          <img className="garage-logo" src={asyncRaceLogo} alt="Async Race Logo" />
          <button className="garage-button large purple" onClick={() => navigate('/winners')}>
            Winners
          </button>
        </div>

        <div className="garage-control-panel">
          <div className="garage-control-panel-form">
            <input
              type="text"
              value={name}
              placeholder="Car name"
              onChange={(e) => setName(e.target.value)}
            />
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
            {/* <button onClick={handleCreate}>Create</button>
        <button onClick={handleUpdate} disabled={!selectedCarId}>Update</button> */}
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
              {/* Car controls: start, stop, select, delete */}
              {/* <button onClick={() => handleStart(car.id)}>Start</button>
            <button onClick={() => handleStop(car.id)}>Stop</button>
            <button onClick={() => dispatch(selectCarForEditing(car))}>Select</button>
            <button onClick={() => dispatch(deleteCar(car.id))}>Delete</button> */}
              {/* Car name and colored icon */}
              <span>{car.name}</span>
              <div className="car-icon" style={{ backgroundColor: car.color }}>
                🚗
              </div>
              {/* Track (e.g., a line or finish flag) */}
              <div className="track"></div>
            </div>
          ))}
        </div>

        <div className="garage-footer">
          <span className="garage-text">
            Garage ({total})
          </span>
          <div className="garage-pagination">
            <button
              className="garage-button small purple"
              onClick={() => dispatch(goToPage(page - 1))}
              disabled={page <= 1}
            >
              Prev
            </button>
            <span className="garage-text">
              Page {page} / {totalPages}
            </span>
            <button
              className="garage-button small purple"
              onClick={() => dispatch(goToPage(page + 1))}
              disabled={page >= totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Garage;
