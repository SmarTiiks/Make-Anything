import React, { useEffect } from 'react'
import './Connexion.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { JwtContext } from '../JWTContext';
import Captcha from '../Captcha/Captcha';
import { FrontBackURLContext } from '../FrontBackURLContext';

function Connexion() {

  const [frontURL, backURL] = useContext(FrontBackURLContext);

  const[jwt, setJwt, refresh, setRefresh] = useContext(JwtContext);
  const [count, setCount] = React.useState(3);
  const [captcha, setCaptcha] = React.useState(false);

  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const validate = (data) => {
    setCaptcha(data);
  };

  const handleusernameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlepasswordChange = (event) => {
    setPassword(event.target.value);
  }

  useEffect(() => {
    if (!captcha)
    {
      setCount(3);
    }
  }, [captcha])

  const handlesubmit = event =>{
    if (count <= 0){
      event.preventDefault();
      alert("Veuillez compléter le Captcha pour continuer"); 
      setCaptcha(true);
      console.log(captcha);
    }
    else{
      event.preventDefault();
      const formData = { "username": username, "password": password }
      axios.post(backURL + '/connexion', formData, { withCredentials: true })
        .then(response => {
          console.log(response);
          setRefresh(refresh === 0 ? 1 : 0);
          navigate('/');
        })
        .catch(error => {
          console.log(error.message);
          setCount(count - 1);
          if (count > 0) {
            alert("Nom d'utilisateur ou mot de passe incorrect. Il vous reste " + count + " essais");
          }
        })
      };
}

  return (
    <div className='form'>
        <h1 className='title'>Connexion</h1>
        {captcha && <Captcha validate={validate}></Captcha>}
        {!captcha && <form method='post' action={backURL + '/connexion'}  className='formconnect'  onSubmit={handlesubmit}>
            <label htmlFor='username' className='content'>
                Nom d'utilisateur :
                <input type="text" name="username" onChange={handleusernameChange} id='username' />
            </label>
            <label htmlFor='password' className='content'>
                Mot de passe :
                <input type="password" name="password" onChange={handlepasswordChange} id='password'/>
            </label>
            <input type="submit" value="Se connecter" className='submit button'/>
        </form>}
    </div>
  )
}

export default Connexion