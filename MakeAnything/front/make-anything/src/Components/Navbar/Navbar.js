import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

function Navbar({jwt}) {
    const current = window.location.pathname.split("/")[1]
    console.log(current);
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
            <Link to="/buy">Mon Compte</Link>
          </React.Fragment>
        )}
        </div>
    </nav>
  )
}

export default Navbar