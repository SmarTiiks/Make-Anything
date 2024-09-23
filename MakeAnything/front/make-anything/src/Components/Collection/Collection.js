import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useReducer } from 'react';
import ModelCard from '../ModelCard/ModelCard';
import { FrontBackURLContext } from '../FrontBackURLContext';

function Collection( {liked = false, noClick = false}) {

    const [frontURL, backURL] = useContext(FrontBackURLContext);

    const initialState = {
        loading: true,
        error: '',
        posts: {}
    }

    const reducer = (state, action) => {
        switch(action.type) {
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

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        axios.get(backURL + '/'+(liked ? 'getLiked' : 'collection'), { withCredentials: true })
        .then(response => {
            dispatch({type: 'FETCH_SUCCESS', payload: response.data})
        })
        .catch(error => {
            dispatch({type: 'FETCH_ERROR'})
        })
    }
    , [])

  return (
    <div className='containerCard'>
        {state.loading ? 'Loading' : state.posts.map((post, index) => 
        <React.Fragment key={index}>
            <ModelCard modele={post} noClick={noClick} collec={true}></ModelCard>
        </React.Fragment>)}
        {state.error ? state.error : null}
    </div>
  )
}

export default Collection