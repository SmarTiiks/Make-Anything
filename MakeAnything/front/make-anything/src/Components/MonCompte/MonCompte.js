import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useReducer } from 'react';
import { JwtContext } from '../JWTContext';
import ModelCard from '../ModelCard/ModelCard';
import './Moncompte.css'
import { useLocation } from 'react-router-dom';
import Collection from '../Collection/Collection';
import { FrontBackURLContext } from '../FrontBackURLContext';

function MonCompte() {

    const [frontURL, backURL] = useContext(FrontBackURLContext);
    const [jwt, setJwt, refresh, setRefresh] = useContext(JwtContext);

    var path = useLocation().pathname
    const initialState = {
        loading: true,
        error: '',
        models: {}
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'FETCH_SUCCESS':
                return {
                    loading: false,
                    models: action.payload,
                    error: ''
                }
            case 'FETCH_ERROR':
                return {
                    loading: false,
                    models: {},
                    error: 'Something went wrong!'
                }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        axios.get(backURL + '/monCompte', { withCredentials: true })
            .then(response => {
                dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
            })
            .catch(error => {
                dispatch({ type: 'FETCH_ERROR' })
            })
    }
        , [])

    return (
        <div>
            <h1>Mon Compte : {jwt.username}</h1> <br />
            <h2>Mes Modèles</h2>
            <div className='containerCard'>
                {state.loading ? 'Loading' : state.models.map((modele, index) =>
                    <React.Fragment key={index} >
                        <ModelCard modele={modele} del={true} noClick={true}/>
                    </React.Fragment>)}
                {state.error ? state.error : null}
            </div>
            <h2>Ma Collection</h2>
            <div>
                <Collection noClick={true}/>
            </div>
            <h2>Mes Modèles aimés</h2>
            <div>
                <Collection noClick={true} liked={true}/>
            </div>
            </div>
    )
}

export default MonCompte