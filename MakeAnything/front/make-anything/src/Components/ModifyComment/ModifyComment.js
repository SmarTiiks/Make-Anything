import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FrontBackURLContext } from '../FrontBackURLContext';

function ModifyComment() {

    const [frontURL, backURL] = useContext(FrontBackURLContext);

    const id = useParams().id;
    const navigate = useNavigate();

    const [deleteImg, setDeleteImg] = useState(false);

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(backURL + '/api/comment/' + id)
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

        const handleTitleChange = (event) => {
            setData({...data, name: event.target.value});
        };

        const handleContentChange = (event) => {
            setData({...data, content: event.target.value});
        };

        const handleDeleteImgChange = (event) => {
            var del = event.target.checked;
            setDeleteImg(del);
            if (del) {
                setData({...data, picture: null});
            }
        };

        const handleFileChange = (event) => {
            setData({...data, picture: event.target.files[0]});
        };

        const handleSubmit = (event) => {
            event.preventDefault();
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('content', data.content);
            formData.append('deleteImg', deleteImg);
            formData.append('picture', data.picture);
            axios.put(backURL + '/api/modifyComment/' + id, formData, {withCredentials: true})
            .then(response => {
                console.log(response.data);
                navigate("/model/" + data.modelID);
            })
            .catch(error => {
                console.log(error.message);
            })
        }

        const handleDelete = (event) => {
            event.preventDefault();
            if (!window.confirm("Voulez-vous vraiment supprimer ce commentaire ?")) return;
            axios.delete(backURL + '/api/deleteComment/' + id, {withCredentials: true})
            .then(response => {
                console.log(response.data);
                navigate("/model/" + data.modelID);
            })
            .catch(error => {
                console.log(error.message);
                navigate("/model/" + data.modelID);
            })
        }

  return (
    <div>
        {loading ? 'Loading' : <div className='form'>
        <h1 className='title'>Modifier le Commentaire</h1>
        <form onSubmit={handleSubmit} method='post'>

            <div><label htmlFor='title' className='content'>Titre </label>
            <input type="text" required id='title' name='title' value={data.name} onChange={handleTitleChange} ></input></div>

            <div><label htmlFor='comment' className='content'>Commentaire </label>
            <textarea required id='comment' name='comment' value={data.content} onChange={handleContentChange}></textarea></div>

            <div style={{display: "block"}}>
                <input type='checkbox' name='deleteImg' id='deleteImg' value={true}  onChange={handleDeleteImgChange} />
                <label style={{marginLeft: "10px"}} htmlFor='deleteImg' className='content'>Supprimer l'image ?</label>
            </div>

            {!deleteImg && <div id='togglable'><label htmlFor='picture' required className='content'>Image</label>
            <input type='file'id='picture' name='picture'accept='.jpeg, .png, .gif, .webp' onChange={handleFileChange}></input></div>}
            
            <input type="submit" value="Modifier" className='submit button'></input>
            <button onClick={handleDelete} className='button submit'>Supprimer</button>
        </form>
    </div>}
        {error ? error : null}
    </div>
  )
}

export default ModifyComment;