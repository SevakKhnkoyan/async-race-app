import './WinnerPopup.scss';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { resetWinner } from '../../../store/winnersSlice';

export const WinnerPopup = () => {
  const winner = useAppSelector((s) => s.winners.winner);
  const dispatch = useAppDispatch();

  const handleCloseWinner = () => dispatch(resetWinner());

  return (
    <div
      className="race-winner-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="winner-title"
      onClick={handleCloseWinner}
    >
      <div className="race-winner-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="race-winner-close"
          aria-label="Close winner popup"
          onClick={handleCloseWinner}
          autoFocus
        >
          ×
        </button>

        <div className="race-winner-eyebrow">Winner</div>
        <h3 id="winner-title" className="race-winner-title">
          🏁 <strong>{winner?.name}</strong> wins!
        </h3>
        <p className="race-winner-time">Time: {winner?.time.toFixed(2)}s</p>

        <div className="race-winner-actions">
          <button
            type="button"
            className="garage-button small green"
            onClick={() => {
              handleCloseWinner();
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};
