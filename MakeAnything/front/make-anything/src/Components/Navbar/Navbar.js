import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './navbar.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { JwtContext } from '../JWTContext'
import { FrontBackURLContext } from '../FrontBackURLContext'

function Navbar() {

  const [frontURL, backURL] = useContext(FrontBackURLContext);

  const [jwt, setJwt, refresh, setRefresh] = useContext(JwtContext);
const navigate = useNavigate();
  const handledisconnect = (event) => {
    event.preventDefault();
    axios.get(backURL + '/logout', { withCredentials: true })
      .then(response => {
        navigate('/');
        setRefresh(refresh === 0 ? 1 : 0);
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  return (
    <nav className='navbar'>
      <Link to="/" className='navbar_logo'><img src='/logo.png' width={"100px"} height={"100px"}></img><span className='navbartitle'>Make Anything</span></Link>
      <div className='navlinks'>
        <Link to="/" className='navbarlink' >Accueil</Link>
        {!jwt && (
          <React.Fragment>
            <Link to="/inscription" className='navbarlink'>Inscription</Link>
            <Link to="/connexion" className='navbarlink'>Connexion</Link>
          </React.Fragment>
        )}
        {jwt && (
          <React.Fragment>
            <Link to="/newModel" className='navbarlink'>Publier un Modèle</Link>
            <Link to="/moncompte" className='navbarlink'>Mon Compte: {jwt.username}</Link>
            <Link to="/deconnexion" onClick={handledisconnect} className='navbarlink'>Déconnexion</Link>
          </React.Fragment>
        )}
      </div>
    </nav>
  )
}

export default Navbar