import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={
        {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "10vh",
            backgroundColor: "#B82C1F",
            // borderBottom: "1px solid black"
        }
        
    }>
        <Link to="/" style={
            {
                display: "flex",
                alignItems: "center",
                color: "black",
                textDecoration: "none",
                textShadow: "0 0 5px white",
                // marginLeft: "5vw"
            }
        
        }><img src='http://localhost:5000/logo.png' width={"100px"}></img><span>Make Anything</span></Link>
        <div style={
            {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "50vw",
                marginRight: "5vw",
                color: "black",
                textDecoration: "none",
                textShadow: "0 0 5px white",
            }
        
        }>
        <Link to="/" style={
            {color: "black",
                textDecoration: "none",
                textShadow: "0 0 5px white",}
        }>Accueil</Link>
        <Link to="/buy" style={
            {color: "black",
                textDecoration: "none",
                textShadow: "0 0 5px white",}
        }>Connexion</Link>
        <Link to="/buy" style={
            {color: "black",
                textDecoration: "none",
                textShadow: "0 0 5px white",}
        }>Publier un Modèle</Link>
        <Link to="/buy" style={
            {color: "black",
                textDecoration: "none",
                textShadow: "0 0 5px white",}
        }>Mon Compte</Link>
        </div>
    </nav>
  )
}

export default Navbar