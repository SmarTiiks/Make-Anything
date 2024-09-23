import './App.css';
import './Components/colors.css';
import Navbar from './Components/Navbar/Navbar';
import { Route, Routes, useLocation } from 'react-router-dom';
import Hero from './Components/Hero/Hero';
import Footer from './Components/Footer/Footer';
import Inscription from './Components/Inscription/Inscription';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Connexion from './Components/Connexion/Connexion';
import MonCompte from './Components/MonCompte/MonCompte';
import NewModel from './Components/NewModel/NewModel';
import { JwtContext } from './Components/JWTContext';
import ModifyModel from './Components/ModifyModel/ModifyModel';
import Accueil from './Components/Accueil/Accueil';
import Model from './Components/Model/Model';
import ModifyComment from './Components/ModifyComment/ModifyComment';
import Respond from './Components/Respond/Respond';
import { FrontBackURLContext } from './Components/FrontBackURLContext';

<script src="https://kit.fontawesome.com/727fcf8105.js" crossorigin="anonymous"></script>


function App() {

    // const frontURL = "http://localhost:3000";
    const backURL = "http://localhost:5000";
    const frontURL = "http://localhost:3000";
    // const backURL = "https://makeanything.onrender.com";

    // Check for account token
    const [jwt, setJwt] = useState(null);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        axios.get(backURL + '/getjwt', { withCredentials: true })
            .then(response => {
                setJwt(response.data)
            })
            .catch(error => {
                console.log(error);
            })
    }, [refresh])

    return (
        <div className="App">
            {useLocation().pathname == "/" && <Hero />}
            <FrontBackURLContext.Provider value={[frontURL, backURL]}>
            <JwtContext.Provider value={[jwt, setJwt, refresh, setRefresh]}>
                <Navbar/>

                <Routes>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/accueil/:tag" element={<Accueil />} />
                    <Route path='/inscription' element={<Inscription></Inscription>} />
                    <Route path='/connexion' element={<Connexion></Connexion>} />
                    <Route path='/monCompte' element={<MonCompte></MonCompte>} />
                    <Route path='/modify/:id' element={<ModifyModel />} />
                    <Route path='/model/:id' element={<Model></Model>} />
                    <Route path='/modifyComment/:id' element={<ModifyComment/>}/>
                    <Route path='/respond/:modelId/:id' element={<Respond/>} />
                    <Route path='/newModel' element={<NewModel></NewModel>} />

                </Routes>
                <Footer />
            </JwtContext.Provider>
            </FrontBackURLContext.Provider>
        </div>
    );
}

export default App;
