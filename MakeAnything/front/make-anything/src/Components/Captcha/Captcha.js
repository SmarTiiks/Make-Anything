import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Captcha.css';
import { useContext } from 'react';
import { FrontBackURLContext } from "../FrontBackURLContext";

function Captcha( {validate}) {

    const [FrontURL, backURL] = useContext(FrontBackURLContext);


    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [captcha, setCaptcha] = useState('');
    const [verify, setVerify] = useState('');

    useEffect(() => {
        axios.get(backURL + '/captcha', {withCredentials: true})
        .then(response => {
            setLoading(false);
            setData(response.data);
            setError('');
        })
        .catch(error => {
            setLoading(false);
            setData([]);
            setError('Something went wrong!');
        })
        }, [])

    const handleSubmit = event =>{
        event.preventDefault();
        axios.post(backURL + '/verify', {captcha: captcha}, {withCredentials: true})
        .then(response => {
            setVerify(response.data);
            if(response.data == 'Valid'){
                validate(false);
            }
            console.log(verify);
        })
        .catch(error => {
            alert(error);
        }) 
    };

  return (
    <div>
        {loading ? 'Loading' : <form className='captchaForm' onSubmit={handleSubmit}>
            <p className='captcha' dangerouslySetInnerHTML={{'__html': data}}/>
            <input type="text" name="captcha" placeholder="captcha" value={captcha} onChange={e =>{setCaptcha(e.target.value)}} />
            {/* {verify == 'Valid' ? <p style={{color: 'green', backgroundColor:'lightgreen', width:'200px', margin:'10px auto', borderRadius:'20px'}}> Captcha validé</p> : verify == 'Invalid' ? <p style={{color: 'red', backgroundColor:'lightcoral', width:'200px', margin:'10px auto', borderRadius:'20px'}}>Captcha invalide</p> : null} */}
            <br/>
            <button className='submit button'>Submit</button>
            </form>}
        {error ? error : null}
    </div>
  )
}

export default Captcha;