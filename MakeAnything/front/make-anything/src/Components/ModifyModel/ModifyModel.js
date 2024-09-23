import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FrontBackURLContext } from '../FrontBackURLContext';
import { useContext } from 'react';

function ModifyModel() {

    const [frontURL, backURL] = useContext(FrontBackURLContext);

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    var id = useParams();
    const [nom, setNom] = useState('');
    const [desc, setDesc] = useState('');
    const [pictures, setPictures] = useState([]);
    const [files, setFiles] = useState([]);
    const [conseils, setConseils] = useState('');
    const [tags, setTags] = useState([]); // ['decoration', 'gadget', 'rangement', 'figurine', 'bricolage']

    const handlePictureChange = event =>{
        setPictures(event.target.files)
    }

    const handleFilesChange = event =>{
        setFiles(event.target.files)

    }

    const handleConseilChange = (event) => {
        setConseils(event.target.value);
      };

    const handleTitleChange = (event) => {
        setNom(event.target.value);
    };

    const handleDescChange = (event) => {
        setDesc(event.target.value);
    };

    const handleSubmit = event =>{
        event.preventDefault();
        let formData = new FormData();
        
        formData.append('nom', nom);
        formData.append('desc', desc);
        formData.append('conseils', conseils);
        formData.append('tags', tags);
        for (let i = 0; i < pictures.length; i++) {
          formData.append('pictures', pictures[i]);
        }
        for (let i = 0; i < files.length; i++) {
          formData.append('files', files[i]);  
        }

        axios.put(backURL + '/api/editModel/' + id.id, formData, {withCredentials: true})
            .then(response => {
                console.log("SUCCESS!", response.data);
                navigate('/moncompte');
            })
            .catch(error => {
                alert(`Something is wrong ! ${error}`);
            })
    }

    const handleCheckboxChange = (event) => {
        let tagName = event.target.value;
        if (tags.includes(tagName)) {
            let newTags = tags.filter(tag => tag !== tagName);
            setTags(newTags);
        } else {
          let newTags = [...tags, tagName];
          setTags(newTags);
        }
      }
    

    useEffect(() => {
        axios.get(backURL + '/model/' + id.id, {withCredentials: true})
        .then(response => {
            setLoading(false);
            setData(response.data);
            setNom(response.data.nom);
            setDesc(response.data.description);
            setConseils(response.data.conseils);
            setTags(response.data.tags);
            setError('');
        })
        .catch(error => {
            setLoading(false);
            setData([]);
            setError('Something went wrong!');
        })
        }, [])

  return (
    <div>
        {loading ? 'Loading' : <div className='form'>
        <h1 className='title'>Modifier le Modèle</h1>
        <form onSubmit={handleSubmit}>
            <div><label htmlFor='title' className='content'>Titre <span>*</span></label>
            <input type="text" required id='nom' name='nom' value={nom} onChange={handleTitleChange}></input></div>
            <div><label htmlFor='desc' className='content'>Description <span>*</span></label>
            <textarea required id='desc' name='desc'  onChange={handleDescChange} value={desc}></textarea></div>
            <div><label htmlFor='desc' className='content'>Conseils</label>
            <textarea id='desc' name='desc' onChange={handleConseilChange} value={conseils}></textarea></div>

            <div><label className='content'>Tags</label><div className='taggroup'>
            <div className='tag'><label htmlFor='decoration'>Décoration</label><input onChange={handleCheckboxChange} type='checkbox' value="decoration" name='tags' id='decoration' checked={tags.includes("decoration")}></input></div>
            <div className='tag'><label htmlFor='gadget'>Gadget</label><input onChange={handleCheckboxChange} type='checkbox' value="gadget" name='tags' id='gadget' checked={tags.includes("gadget")}></input></div>
            <div className='tag'><label htmlFor='rangement'>Rangement</label><input onChange={handleCheckboxChange} type='checkbox' value="rangement" name='tags' id='rangement' checked={tags.includes("rangement")}></input></div>
            <div className='tag'><label htmlFor='figurine'>Figurine</label><input onChange={handleCheckboxChange} type='checkbox' value="figurine" name='tags' id='figurine' checked={tags.includes("figurine")}></input></div>
            <div className='tag'><label htmlFor='bricolage'>Bricolage</label><input onChange={handleCheckboxChange} type='checkbox' value="bricolage" name='tags' id='bricolage' checked={tags.includes("bricolage")}></input></div>
          </div></div>

            <div><label htmlFor='picture' required className='content'>Images</label>
            <input type='file'id='pictures' multiple name='pictures' onChange={handlePictureChange} accept='.jpeg, .png, .webp, .gif'></input></div>
            <div><label htmlFor='files' required className='content'>Fichiers 3D</label>
            <input type='file'id='files' name='files' onChange={handleFilesChange} accept='.obj, .stl, .3mf, .zip, .rar'></input></div>
            
            <input type="submit" value="Modifier le Modèle" className='submit button'></input>
        </form>
    </div>}
        {error ? error : null}
    </div>
  )
}

export default ModifyModel;