import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

function Navbar() {
    const current = window.location.pathname.split("/")[1]

  return (
    <nav className='navbar'>
        <Link to="/" className='navbar_logo'><img src='http://localhost:5000/logo.png' width={"100px"} height={"100px"}></img><span>Make Anything {current}</span></Link>
        <div className='navlinks'>
        <Link to="/" >Accueil</Link>
        <Link to="/buy">Connexion</Link>
        <Link to="/buy">Publier un Modèle</Link>
        <Link to="/buy">Mon Compte</Link>
        </div>
    </nav>
  )
}

export default Navbar