import './WinnerPopup.scss';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useEffect } from 'react';
import {
  useCreateWinnerMutation,
  useLazyGetWinnerQuery,
  useUpdateWinnerMutation,
} from '../../../services/winnersApi';
import { resetWinner } from '../../../store/winnersSlice';

export const WinnerPopup = () => {
  const winner = useAppSelector((s) => s.winners.winner);
  const dispatch = useAppDispatch();
  const [createWinner] = useCreateWinnerMutation();
  const [updateWinner] = useUpdateWinnerMutation();
  const [getWinner] = useLazyGetWinnerQuery();

  useEffect(() => {
    if (!winner) return;

    (async () => {
      try {
        await createWinner({
          id: winner.id,
          wins: 1,
          time: winner.time,
          name: winner.name,
        }).unwrap();
      } catch {
        // Duplicate id => update wins/time
        try {
          const existing = await getWinner(winner.id).unwrap();
          const newWins = (existing?.wins ?? 0) + 1;
          const bestTime = Math.min(existing?.time ?? winner.time, winner.time);
          await updateWinner({
            id: winner.id,
            wins: newWins,
            time: bestTime,
            name: winner.name,
          }).unwrap();
        } catch {
          /* swallow / log if needed */
        }
      }
    })();
  }, [winner?.id]);

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
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
