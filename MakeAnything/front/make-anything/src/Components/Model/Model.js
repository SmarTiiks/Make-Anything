import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { JwtContext } from '../JWTContext';
import { useContext } from 'react'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import './Model.css';

import Comments from '../Comments/Comments';
import NewComment from '../NewComment/NewComment';
import LikeButton from '../LikeButton/LikeButton';
import CollecButton from '../CollecButton/CollecButton';
import ModelViewer from '../ModelViewer/ModelViewer';
import { FrontBackURLContext } from '../FrontBackURLContext';

function Model() {

    const [frontURL, backURL] = useContext(FrontBackURLContext);

    const [model, setModel] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [viewModel, setViewModel] = useState(false);

    const [jwt, setJwt, refresh, setRefresh] = useContext(JwtContext);
    const [liked, setLiked] = useState(false);
    
    const id = useParams();
    
    useEffect(() => {
        axios.get(backURL + '/model/' + id.id)
            .then(response => {
                setLoading(false);
                setModel(response.data);
                setError('');
            })
            .catch(error => {
                setLoading(false);
                setModel([]);
                setError('Something went wrong!');
            });
    }, [])

    const handleview = (event) => {
        setViewModel(!viewModel);
    };

    const handleDownload = (event) => {
        event.preventDefault();
        axios.put(backURL + '/api/download/' + id.id)
            .then(res => {
                var pervModel = model;
                pervModel.telechargement = pervModel.telechargement + 1;
                setModel(pervModel);
                setRefresh(refresh === 0 ? 1 : 0);
            });
        const link = document.createElement('a');
        link.href = backURL + '/' + model.files[0];
        link.target = '_blank';
        link.setAttribute('download', backURL + '/' + model.files[0]);
        link.click();
    };

    return (
        <div>
            {loading ? 'Loading' :
                <React.Fragment>
                    <div className='model'>
                        <div className='leftGroup'>
                            <div style={{display: viewModel ? "none" : ""}}>
                            <Carousel autoPlay infiniteLoop interval={3000} className='car' renderIndicator={false} showThumbs={false}>
                                {model.pictures && model.pictures.map((image, index) => {
                                    return (
                                        <div key={index}>
                                            <img src={backURL + '/' + image} alt='Image' />
                                            {/* <p>t</p> */}
                                        </div>
                                    )
                                })}
                                
                                
                            </Carousel>
                            </div>

                            <div style={{display: !viewModel ? "none" : ""}}>
                            <ModelViewer model={model}/>
                            </div>

                            <h1>{model.nom}</h1>
                            <div className='bigbutton viewbutton' onClick={handleview}>{ viewModel ? "Hide Model" : "View Model" }</div>
                            <div className='buttoncontainer'>
                                <div className='likebutton bigbutton'><LikeButton model={model} /></div>
                                <div onClick={handleDownload} className='downloadbutton bigbutton'>{model.telechargement} <FontAwesomeIcon icon={faDownload} /></div>
                            </div>
                            <div className='bigbutton'> <CollecButton model={model}/></div>
                        </div>
                        <div className='rightGroup'>
                            <div className={model.conseils == "" ? 'fullsize' : ''}><h2>Description</h2><br />{model.description}</div>
                            {model.conseils !== "" && <div><h2>Conseils d'impression</h2><br />{model.conseils}</div>}
                        </div>
                    </div>
                    {jwt && <NewComment modelId={id.id} motherId={'none'} />}
                    <div className='comments'>
                        <Comments modelId={id.id} motherId={'none'}></Comments>
                    </div>
                </React.Fragment>}
            {error ? error : null}
        </div>
    )
}

export default Model;