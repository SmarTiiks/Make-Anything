import './App.css';
import './Components/colors.css';
import Navbar from './Components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Hero from './Components/Hero/Hero';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Hero />
      <Navbar />

      <Routes>
      <Route path="/buy" element={<h1>Buy</h1>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
