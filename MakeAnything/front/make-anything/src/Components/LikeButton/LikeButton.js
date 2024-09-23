import React from 'react'
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartFull } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { JwtContext } from '../JWTContext';
import { useContext } from 'react';
import { FrontBackURLContext } from '../FrontBackURLContext';

function LikeButton({model, noClick}) {

    const [frontURL, backURL] = useContext(FrontBackURLContext);

    const [jwt, setJwt, refresh, setRefresh] = useContext(JwtContext);
    const [liked, setLiked] = useState(jwt && model && model.likes.includes(jwt.id));
    const initliked = jwt && model && model.likes.includes(jwt.id);

    noClick = noClick || !jwt;

    const handleLike = (event) => {
        if (noClick) return;
        if (jwt) {
            console.log(model);

            axios.put(backURL + '/api/like/' + model._id, {}, { withCredentials: true })
                .then((result) => {
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                })
            setLiked(!liked);
        } else {
            console.log("You need to be logged in to like a model");
        }
    };

  return (
    <div style={{ cursor: noClick ? "not-allowed" : "pointer"}} onClick={handleLike}>{model.likes.length + liked - initliked} <FontAwesomeIcon icon={liked ? faHeartFull : faHeart}/></div>
    )
}

export default LikeButton