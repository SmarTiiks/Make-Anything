import './App.css';
import './Components/colors.css';
import Navbar from './Components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Hero from './Components/Hero/Hero';
import Footer from './Components/Footer/Footer';
import Inscription from './Components/Inscription/Inscription';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Connexion from './Components/Connexion/Connexion';



function App() {

  // Check for account token
  const[jwt, setJwt] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:5000/getJwt', {withCredentials: true})
    .then(response => {
      setJwt(response.data);
    })
    .catch(error => {
      // console.log(error.message);
    })
  }, [])

  return (
    <div className="App">
      <Hero />
      <Navbar jwt={jwt} />

      <Routes>
      <Route path="/buy" element={<h1>Buy</h1>} />
      <Route path='/inscription' element={<Inscription></Inscription>} />
      <Route path='/connexion' element={<Connexion></Connexion>} />
      <Route path='/monCompte' element={<h1>Mon compte</h1>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
