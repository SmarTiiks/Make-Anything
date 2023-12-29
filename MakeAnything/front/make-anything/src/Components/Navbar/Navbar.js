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
    console.log(current);

    const handledisconnect = (event) => {
        event.preventDefault();
        axios.get('http://localhost:5000/logout', {withCredentials: true})
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
        <Link to="/" className='navbar_logo'><img src='http://localhost:5000/logo.png' width={"100px"} height={"100px"}></img><span>Make Anything</span></Link>
        <div className='navlinks'>
        <Link to="/" >Accueil</Link>
        {!jwt && (
          <React.Fragment>
            <Link to="/inscription">Inscription</Link>
            <Link to="/connexion">Connexion</Link>
          </React.Fragment>
        )}
        {jwt && (
          <React.Fragment>
            <Link to="/buy">Publier un Modèle</Link>
            <Link to="/moncompte">Mon Compte</Link>
            <Link to="/deconnexion" onClick={handledisconnect}>Déconnexion</Link>
          </React.Fragment>
        )}
        </div>
    </nav>
  )
}

export default Navbar