import React from 'react';
import './Garage.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  useCreateCarMutation,
  useDeleteCarMutation,
  useGetCarsQuery,
} from '../../services/carsApi';
import { Loader } from '../Loader/Loader';
import { CarIcon } from './CarIcon';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { selectCarForEditing } from '../../store/garageSlice';
import { ControlPanel } from '../ControlPanel/ControlPanel';

const Garage: React.FC = () => {
  const dispatch = useAppDispatch();
  const limit = 7;
  const page = useAppSelector((state) => state.garage.page);
  const { data, isFetching } = useGetCarsQuery({ page, limit });
  const cars = data?.cars ?? [];
  const total = data?.total ?? 0;
  const [, { isLoading }] = useCreateCarMutation();
  const [deleteCar] = useDeleteCarMutation();

  return (
    <>
      {(isLoading || isFetching) && <Loader />}
      <div className="garage-view">
        <Header />
        
        <ControlPanel />

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
