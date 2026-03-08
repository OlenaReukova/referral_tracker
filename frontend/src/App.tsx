import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Tracker } from './pages/Tracker';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tracker/:id" element={<Tracker />} />
    </Routes>
  );
}

export default App;