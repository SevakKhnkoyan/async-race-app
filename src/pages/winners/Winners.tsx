import React, { useState } from 'react';
import { Header } from '../../components/header/Header';
import type { WinnerInfo, WinnerSortField, SortOrder } from '../../types';
import './Winners.scss';
import { useGetCarQuery } from '../../services/carsApi';
import { useGetWinnersQuery } from '../../services/winnersApi';
import { CarIcon } from '../garage/carRow/CarIcon';
import { Loader } from '../../components/loader/Loader';
import { Footer } from '../../components/footer/Footer';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { goToPageWinners } from '../../store/winnersSlice';

const PAGE_SIZE = 10;

const WinnerInfoTable: React.FC<{
  rowNumber: number;
  winner: WinnerInfo;
}> = ({ rowNumber, winner }) => {
  const { data: car } = useGetCarQuery(winner.id);

  return (
    <div className="tr" key={winner.id}>
      <div className="td">{rowNumber}</div>
      <div className="td">
        {car ? <CarIcon color={car.color} /> : <span className="car-skeleton">🚗</span>}
      </div>
      <div className="td">{car?.name ?? '…'}</div>
      <div className="td">{winner.wins}</div>
      <div className="td">{winner.time.toFixed(2)}</div>
    </div>
  );
};

const Winners: React.FC = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector((state) => state.winners.page);
  const [sort, setSort] = useState<WinnerSortField | undefined>(undefined);
  const [order, setOrder] = useState<SortOrder>('ASC');

  const { data, isFetching } = useGetWinnersQuery({
    page: page,
    limit: PAGE_SIZE,
    sort,
    order,
  });

  const total = data?.total ?? 0;

  const toggleSort = (field: WinnerSortField) => {
    if (sort === field) {
      setOrder((o) => (o === 'ASC' ? 'DESC' : 'ASC'));
    } else {
      setSort(field);
      setOrder('ASC');
    }
    dispatch(goToPageWinners(1));
  };

  return (
    <div className="view">
      <Header />

      <div className="winners-body">
        <div className="table garage-text">
          <div className="thead">
            <div className="th">№</div>
            <div className="th">Car</div>
            <div className="th">Name</div>
            <div className="th">
              <button
                type="button"
                className={`garage-button small ${sort === 'wins' ? 'green' : 'purple'}`}
                onClick={() => toggleSort('wins')}
              >
                Wins {sort === 'wins' ? (order === 'ASC' ? '▲' : '▼') : '⇅'}
              </button>
            </div>
            <div className="th">
              <button
                type="button"
                className={`garage-button small ${sort === 'time' ? 'green' : 'purple'}`}
                onClick={() => toggleSort('time')}
              >
                Best time {sort === 'time' ? (order === 'ASC' ? '▲' : '▼') : '⇅'}
              </button>
            </div>
          </div>

          <div className="tbody" aria-busy={isFetching}>
            {data?.items.map((w, idx) => (
              <WinnerInfoTable key={w.id} rowNumber={(page - 1) * PAGE_SIZE + idx + 1} winner={w} />
            ))}

            {isFetching && <Loader />}
            {!isFetching && (data?.items.length ?? 0) === 0 && (
              <div className="garage-text">No winners yet.</div>
            )}
          </div>
        </div>

        <Footer page={page} total={total} limit={PAGE_SIZE} />
      </div>
    </div>
  );
};

export default Winners;
