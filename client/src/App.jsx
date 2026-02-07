import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login'; 

const Watchlist = () => <div className="pt-20 sm:pt-28 md:pt-32 px-4 text-center text-gray-500">Your Watchlist (Coming Phase 4)</div>;
const Alerts = () => <div className="pt-20 sm:pt-28 md:pt-32 px-4 text-center text-gray-500">System Alerts (Coming Phase 4)</div>;

function App() {
  return (
    <div className="min-h-screen bg-space-950 text-white selection:bg-accent-purple/30">
      <Navbar />
      <main> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> {/* Add Route */}
          <Route path="/dashboard" element={<div className="pt-14 sm:pt-16"><Dashboard /></div>} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/alerts" element={<Alerts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;