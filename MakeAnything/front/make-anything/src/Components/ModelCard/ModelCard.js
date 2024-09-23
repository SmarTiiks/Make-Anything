import React, { useState } from 'react'
import './ModelCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { redirect, useNavigate } from 'react-router-dom';
import { JwtContext } from '../JWTContext';
import { useContext } from 'react';
import LikeButton from '../LikeButton/LikeButton';
import CollecButton from '../CollecButton/CollecButton';
import { FrontBackURLContext } from '../FrontBackURLContext';


function ModelCard({ modele, del = false, noClick = false, collec = false }) {

    const [frontURL, backURL] = useContext(FrontBackURLContext);

    
    const navigate = useNavigate();
    const [style, setStyle] = useState({});
    
    const [jwt, setJwt, refresh, setRefresh] = useContext(JwtContext);
    
    const [model, setModel] = useState(modele);
    const id = { id: model._id };
    

    const handledelete = () => {
        if (window.confirm('Voulez-vous vraiment supprimer ce modèle ?')) {
            axios.delete(backURL + '/api/models/' + model._id + '/delete', { withCredentials: true })
                .then(response => {
                    setStyle({ display: 'none' });
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }

    const handleedit = () => {
        navigate('/modify/' + model._id);
    }

    const handleConsult = () => {
        navigate('/model/' + model._id);
    }

    return (
        <div className='cardModel' style={style}>
            <img src={backURL + "/" + model.pictures[0]} onClick={handleConsult} alt="Modèle" />
            <h1 className='modeltitle' onClick={handleConsult} >{model.nom}</h1>
            <div className='buttoncontainer'>
                <div className='likebutton smallbutton'><LikeButton model={model} noClick={noClick} /></div>
                <div style={{ cursor: "not-allowed"}} className='downloadbutton smallbutton'>{model.telechargement} <FontAwesomeIcon icon={faDownload} /></div>
            </div>
            {del && <div className='deletebutton smallbutton mt' onClick={handleedit}>Modifier</div>}
            {del && <div className='deletebutton smallbutton mt mb' onClick={handledelete}>Supprimer</div>}
            {!del && !collec && <div className='smallbutton mt mb'><CollecButton model={model} /></div>}

        </div>
    )
}

export default ModelCard