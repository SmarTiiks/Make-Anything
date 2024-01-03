import React from 'react'
import './Connexion.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Connexion() {

  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleusernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlepasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handlesubmit = event =>{
    event.preventDefault();
    const formData = { "username": username, "password": password}
    axios.post('/connexion', formData)
    .then(response => {
        console.log(response);
        navigate('/');
        // window.location.href = '/connexion';
      })
      .catch(error => {
        console.log(error.message);
      })
}

  return (
    <div className='form'>
        <h1 className='title'>Connexion</h1>
        <form method='post' action='/connexion'  className='formconnect'>
            <label htmlFor='username' className='content'>
                Nom d'utilisateur :
                <input type="text" name="username" onChange={handleusernameChange} id='username' />
            </label>
            <label htmlFor='password' className='content'>
                Mot de passe :
                <input type="password" name="password" onChange={handlepasswordChange} id='password'/>
            </label>
            <input type="submit" value="Se connecter" className='submit button'/>
        </form>
    </div>
  )
}

export default Connexion