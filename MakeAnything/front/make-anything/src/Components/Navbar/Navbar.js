import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './navbar.css'
import axios from 'axios'
import { useEffect, useState } from 'react'

function Navbar() {
  const navigate = useNavigate();


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
    const current = window.location.pathname.split("/")[1]

    const handledisconnect = (event) => {
        event.preventDefault();
        axios.get('/logout', {withCredentials: true})
        .then(response => {
            console.log(response.data);
            window.location.href = '/connexion';
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
            <Link to="/buy" className='navbarlink'>Publier un Modèle</Link>
            <Link to="/moncompte" className='navbarlink'>Mon Compte</Link>
            <Link to="/deconnexion" onClick={handledisconnect} className='navbarlink'>Déconnexion</Link>
          </React.Fragment>
        )}
        </div>
    </nav>
  )
}

export default Navbar