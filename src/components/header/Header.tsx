import './Header.scss';
import asyncRaceLogo from '../../assets/asyncRaceLogo.png';
import { useLocation, useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isWinners = pathname === '/winners';
  const title = isWinners ? 'Winners' : 'Garage';
  const buttonText = isWinners ? 'Garage' : 'Winners';
  const target = isWinners ? '/' : '/winners';

  return (
    <div className="garage-header">
      <h2 className="garage-title">{title}</h2>
      <img className="garage-logo" src={asyncRaceLogo} alt="Async Race Logo" />
      <button type="button" className="garage-button large purple" onClick={() => navigate(target)}>
        {buttonText}
      </button>
    </div>
  );
};
