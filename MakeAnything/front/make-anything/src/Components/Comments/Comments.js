import axios from 'axios';
import React, { useEffect } from 'react'
import { useReducer } from 'react';
import { useContext } from 'react';
// Contexts
import { JwtContext } from '../JWTContext';
import './Comments.css'
import { useNavigate } from 'react-router-dom';
import { FrontBackURLContext } from '../FrontBackURLContext';

function Comments({ modelId, motherId }) {

    const [frontURL, backURL] = useContext(FrontBackURLContext);

    const [jwt, setJwt, refresh, setRefresh] = useContext(JwtContext);
    const navigate = useNavigate();

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

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        axios.get(backURL + '/api/comments/' + modelId + '/' + motherId)
            .then(response => {
                dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
            })
            .catch(error => {
                dispatch({ type: 'FETCH_ERROR' })
            })
    }
        , [refresh])

    const formatDate = (date) => {
        let d = new Date(date);
        return d.getDate() + '/' + ((d.getMonth() + 1) < 10 ? ('0' + (d.getMonth() + 1)) : (d.getMonth() + 1)) + '/' + d.getFullYear() + '  à ' + d.getHours() + 'h' + d.getMinutes();
    };

    return (
        <div>
            {state.loading ? 'Loading' : state.posts.map((post, index) =>
                <div key={index} className='card-comment-container'>
                    <div className='card-comment content'>
                        <div className='leftPart content'>
                            <img src={backURL + "/" + (post.auteurPic ? post.auteurPic : 'default.png')} className='profilePicture'></img>
                            <h3 className='content uname'>{post.auteurName}</h3>
                            {(jwt != null && (post.auteurID == jwt.id || jwt.admin)) && <div onClick={(event) => navigate('/modifyComment/' + post._id)} className='content smallbutton modify'>Modifier</div>}
                            {(jwt != null && (post.auteurID != jwt.id && !jwt.admin)) && <div onClick={(event) => navigate('/respond/'+ modelId + '/' + post._id)} className='content smallbutton modify'>Répondre</div>}
                            <small>{formatDate(post.date)}</small>
                        </div>
                        <div className='middlePart content'>
                            <div className='ytitle content'>{post.name}</div>
                            <div className='comment content'><div className='center'>{post.content}</div></div>
                        </div>
                        {post.picture && <div className={(jwt != null && (post.auteurID == jwt.id || jwt.admin)) ? 'rightPart content higher' : 'rightPart content'}>
                            <a className='img' href={backURL + '/' + post.picture} target='blank'>
                                <img className='' src={backURL + '/' + post.picture}></img>
                            </a>
                        </div>}
                    </div>
                    <div className='comment-tabbed'>
                        <Comments modelId={modelId} motherId={post._id}></Comments>
                    </div>
                </div>)}
            {state.error ? state.error : null}
        </div>
    )
}

export default Comments