import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
      <Route path="/buy" element={<h1>Buy</h1>} />
      </Routes>
    </div>
  );
}

export default App;
