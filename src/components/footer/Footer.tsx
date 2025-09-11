import './Footer.scss';
import { useAppDispatch } from '../../store/hooks';
import { goToPage } from '../../store/garageSlice';
import { useLocation } from 'react-router-dom';
import { goToPageWinners } from '../../store/winnersSlice';

type FooterProps = {
  page: number;
  total: number;
  limit: number;
};

export const Footer: React.FC<FooterProps> = ({ page, total, limit }) => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const isWinners = pathname === '/winners';
  const title = isWinners ? 'Winners' : 'Garage';
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="garage-footer">
      <span className="garage-text">
        {title} ({total})
      </span>
      <div className="garage-pagination">
        <button
          type="button"
          className="garage-button small purple"
          onClick={() => dispatch(isWinners ? goToPageWinners(page - 1) : goToPage(page - 1))}
          disabled={page <= 1}
        >
          Prev
        </button>
        <span className="garage-text">
          Page {page} / {totalPages}
        </span>
        <button
          type="button"
          className="garage-button small purple"
          onClick={() => dispatch(isWinners ? goToPageWinners(page + 1) : goToPage(page + 1))}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
