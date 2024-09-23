import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FrontBackURLContext } from '../FrontBackURLContext';

function Respond() {

    const [frontURL, backURL] = useContext(FrontBackURLContext);

    const motherId = useParams().id;
    const modelId = useParams().modelId;

    const [data, setData] = useState({title: '', content: '', picture: null});
    let navigate = useNavigate();

    const handleTitleChange = (event) => {
        setData({...data, title: event.target.value});
    }

    const handleContentChange = (event) => {
        setData({...data, content: event.target.value});
    }

    const handleFileChange = (event) => {
        setData({...data, picture: event.target.files[0]});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', data.title);
        formData.append('content', data.content);
        formData.append('picture', data.picture);
        axios.post(backURL + '/api/addComment/'+ modelId +'/' + motherId, formData, {withCredentials: true})
            .then(response => {
                navigate('/model/' + modelId);
            })
            .catch(error => {
                console.log(error);
            })
    }

  return (
    <div className='form'>
        <h1 className='title'>Répondre</h1>
        <form onSubmit={handleSubmit} method='post'>

            <div><label htmlFor='title' className='content'>Titre <span>*</span> </label>
            <input type="text" required id='title' name='title' value={data.name} onChange={handleTitleChange} ></input></div>

            <div><label htmlFor='comment' className='content'>Commentaire <span>*</span> </label>
            <textarea required id='comment' name='comment' value={data.content} onChange={handleContentChange}></textarea></div>

            <div><label htmlFor='picture' className='content'>Image</label>
            <input type='file'id='picture' name='picture'accept='.jpeg, .png, .gif, .webp' onChange={handleFileChange}></input></div>
            
            <input type="submit" value="Répondre" className='submit button'></input>
        </form>
    </div>
  )
}

export default Respond