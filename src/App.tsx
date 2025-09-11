import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Garage from './pages/garage/garagePage/Garage';
import Winners from './pages/winners/Winners';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Garage />} />
        <Route path="/winners" element={<Winners />} />
        <Route path="*" element={<Navigate to="/" replace />} /> {/* redirect unknown routes */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
