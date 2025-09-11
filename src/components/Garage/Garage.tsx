import React, { useEffect, useRef } from 'react';
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
import { CarRowHandle } from '../../types';
import { WinnerPopup } from '../WinnerPopup/WinnerPopup';

const Garage: React.FC = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.garage.page);
  const { data, isFetching } = useGetCarsQuery({ page, limit: PAGE_SIZE });
  const cars = data?.cars ?? [];
  const total = data?.total ?? 0;
  const [createCar, { isLoading: isCreating }] = useCreateCarMutation();
  const [deleteCar] = useDeleteCarMutation();
  const rowRefs = useRef(new Map<number, CarRowHandle>());
  const winner = useAppSelector((s) => s.winners.winner);

  // If current page becomes empty but there are cars overall, go back one page
  useEffect(() => {
    if (!isFetching && page > 1 && total > 0 && cars.length === 0) {
      dispatch(goToPage(page - 1));
    }
  }, [cars.length, total, page, isFetching, dispatch]);

  const attachRowRef = (id: number) => (inst: CarRowHandle | null) => {
    if (inst) rowRefs.current.set(id, inst);
    else rowRefs.current.delete(id);
  };

  const startAll = () => {
    rowRefs.current.forEach((handle) => handle.start?.());
  };

  const resetAll = () => {
    rowRefs.current.forEach((handle) => handle.stop?.());
  };

  return (
    <>
      {(isCreating || isFetching) && <Loader />}
      {winner && <WinnerPopup />}

      <div className="view">
        <Header />

        <ControlPanel onCreate={createCar} onStartRace={startAll} onResetRace={resetAll} />

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
                ref={attachRowRef(car.id)}
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
