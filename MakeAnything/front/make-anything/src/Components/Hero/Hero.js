import React from 'react'
import { Link } from 'react-router-dom'
import './hero.css'

function Hero() {
    const current = window.location.pathname.split("/")[1]

  return (
    <div className='hero'>
        <div className='hero_content'>
            <h1>Make Anything</h1>
            <p>Partagez vos modèles 3D et imprimez ceux des autres !</p>
        </div>
    </div>
  )
}

export default Hero