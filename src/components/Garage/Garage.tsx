import React, { useEffect } from 'react';
import './Garage.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  useCreateCarMutation,
  useDeleteCarMutation,
  useGetCarsQuery,
} from '../../services/carsApi';
import { Loader } from '../Loader/Loader';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { goToPage, selectCarForEditing } from '../../store/garageSlice';
import { ControlPanel } from '../ControlPanel/ControlPanel';
import { PAGE_SIZE } from '../../constants';
import { CarRow } from '../CarRow/CarRow';

const Garage: React.FC = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.garage.page);
  const { data, isFetching } = useGetCarsQuery({ page, limit: PAGE_SIZE });
  const cars = data?.cars ?? [];
  const total = data?.total ?? 0;
  const [createCar, { isLoading: isCreating }] = useCreateCarMutation();
  const [deleteCar] = useDeleteCarMutation();

  // If current page becomes empty but there are cars overall, go back one page
  useEffect(() => {
    if (!isFetching && page > 1 && total > 0 && cars.length === 0) {
      dispatch(goToPage(page - 1));
    }
  }, [cars.length, total, page, isFetching, dispatch]);

  return (
    <>
      {(isCreating || isFetching) && <Loader />}
      <div className="garage-view">
        <Header />

        <ControlPanel onCreate={createCar} />

        <div className="cars-list">
          {!isFetching && total === 0 ? (
            <div className="garage-empty">
              <p className="garage-empty__title">No Cars</p>
              <p className="garage-empty__hint">Use the form above to create your first car.</p>
            </div>
          ) : (
            cars.map((car) => (
              <CarRow
                key={car.id}
                car={car}
                onSelect={(id) => dispatch(selectCarForEditing(id))}
                onDelete={(id) => deleteCar(id)}
              />
            ))
          )}
        </div>

        <Footer page={page} total={total} limit={PAGE_SIZE} />
      </div>
    </>
  );
};

export default Garage;
