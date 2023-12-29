import React from 'react'
import './Connexion.css'

function Connexion() {
  return (
    <div className='content'>
        <h1 className='title'>Connexion</h1>
        <form method='post' action='http://localhost:5000/connexion' className='formconnect'>
            <label htmlFor='username'>
                Nom d'utilisateur :
                <input type="text" name="username" id='username' />
            </label>
            <label htmlFor='password'>
                Mot de passe :
                <input type="password" name="password" id='password'/>
            </label>
            <input type="submit" value="Se connecter" className='submit'/>
        </form>
    </div>
  )
}

export default Connexion