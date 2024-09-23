import React, { useState } from 'react'
import { useContext } from 'react'
import { JwtContext } from '../JWTContext'
import './NewComment.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FrontBackURLContext } from '../FrontBackURLContext';

function NewComment({modelId, motherId}) {

    const [frontURL, backURL] = useContext(FrontBackURLContext);
    const[jwt, setJwt, refresh, setRefresh] = useContext(JwtContext);

    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const [picture, setPicture] = useState('');
    const[message, setMessage] = useState('Click to upload an image');
    const navigate = useNavigate();
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('submitted');
        const formData = new FormData();
        formData.append('name', title);
        formData.append('content', content);
        formData.append('modelID', modelId);
        formData.append('motherID', motherId);
        formData.append('picture', picture);
        axios.post(backURL + '/api/addComment/' + modelId + '/' + motherId, formData, {withCredentials: true})
        .then(response => {
            setRefresh(refresh === 0 ? 1 : 0);
            setContent('');
            setTitle('');
            setPicture('');
            navigate('/model/' + modelId);
        })
        .catch(error => {
            console.log(error);
        })
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleCommentChange = (event) => {
        setContent(event.target.value);
    };

    const handleFileChange = (event) => {
        setPicture(event.target.files[0]);
        setMessage(event.target.files[0].name);
    };

  return (
    <form className='new-comment' onSubmit={handleSubmit}>
        <div className='leftPart'>
            <img src={backURL + "/"+jwt.picture} alt='Profile Picture' className='profilePicture'></img>
            <h3 className='content uname'>{jwt.username}</h3>
        </div>
        <div className='middlePart'>
            <input type='text' placeholder='Your Title' className='ytitle content' value={title} onChange={handleTitleChange} required></input>
            <textarea placeholder='Your Comment' className='comment content' onChange={handleCommentChange} value={content} required>
            </textarea>
            <div className='relat'>
                <input type='submit' className='smallbutton submit' value='Send'></input>
            </div>
        </div>
        <div className='rightPart'>
            <input type='file' name='photo' accept='.jpeg, .png, .gif, .webp' id='commentIMG' className='file' onChange={handleFileChange}></input>
            <label htmlFor='commentIMG' className='uploadcontent content'>{message}</label>
        </div>
    </form>
  )
}

export default NewComment