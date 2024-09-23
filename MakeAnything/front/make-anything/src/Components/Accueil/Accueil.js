import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useReducer } from 'react';
import ModelCard from '../ModelCard/ModelCard';
import './Accueil.css'
import { JwtContext } from '../JWTContext';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import FilterBar from '../FilterBar/FilterBar';
import { FrontBackURLContext } from '../FrontBackURLContext';

function Accueil() {

    const [FrontURL, backURL] = useContext(FrontBackURLContext);

    var tag = useParams().tag;
    tag = tag ? tag : 'recent';

    
    const [search, setSearch] = useState('');
    
    const [jwt, setJwt, refresh, setRefresh] = useContext(JwtContext);
    
    var navigate = useNavigate();
    if (tag.endsWith('0')) {
        navigate('/accueil/' + tag.slice(0, -1));
        setRefresh(refresh === 0 ? 1 : 0);
    }
    const [filteredData, setFilteredData] = useState(false);

    const initialState = {
        loading: true,
        error: '',
        posts: {}
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'FETCH_SUCCESS':
                return {
                    loading: false,
                    posts: action.payload,
                    error: ''
                }
            case 'FETCH_ERROR':
                return {
                    loading: false,
                    posts: {},
                    error: 'Something went wrong!'
                }
            default:
                return state
        }
    }

    const handleSearch = (event) => {
        setSearch(event.target.value);
        if (search == '') {
            setFilteredData(false);
        }
        else {
            var res = state.posts.filter((post) => { return post.nom.toLowerCase().includes(search.toLowerCase()) });
            setFilteredData(res);
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        var newTag = tag == 'download' ? 'recent' : tag;
        axios.get(backURL + '/models/' + newTag)
            .then(response => {
                if (tag == 'download') {
                    var sorted = [...response.data].sort((a, b) => b.telechargement - a.telechargement);
                    dispatch({ type: 'FETCH_SUCCESS', payload: sorted });
                }
                else{
                    dispatch({ type: 'FETCH_SUCCESS', payload: response.data })
                }
            })
            .catch(error => {
                dispatch({ type: 'FETCH_ERROR' })
            });
        setSearch('');
        setFilteredData(false);
    }
        , [refresh])

    return (
        <div>
            <div><FilterBar current={tag} /></div>
            <form className='search-bar'>
                <label htmlFor="search"><FontAwesomeIcon icon={faSearch} /></label>
                <input className='content' type='text' id='search' value={search} onChange={handleSearch} />
            </form>
            <h1 className='title'>Accueil</h1>
            <div className='CardContainer'>
                {state.loading ? 'Loading' : filteredData ? (filteredData.map((post, index) =>
                    <ModelCard modele={post} key={index}></ModelCard>)) : (state.posts.map((post, index) =>
                        <ModelCard modele={post} key={index}></ModelCard>))}
                {state.error ? state.error : null}
            </div>
        </div>
    )
}

export default Accueil