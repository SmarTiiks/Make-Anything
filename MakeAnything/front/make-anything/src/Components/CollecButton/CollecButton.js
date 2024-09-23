import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { JwtContext } from '../JWTContext';
import { useContext } from 'react';
import { FrontBackURLContext } from '../FrontBackURLContext';

function CollecButton({model}) {

    const [frontUrl, backURL] = useContext(FrontBackURLContext);

    const [jwt, setJwt, refresh, setRefresh] = useContext(JwtContext);
    const [collec, setCollec] = useState(false);

    useEffect(() => {
        if (jwt) {
        axios.get(backURL + '/isInCollection/' + model._id, { withCredentials: true })
            .then(response => {
                setCollec(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        }
    } , []);

    const handleCollec = (event) => {
        if (jwt) {
            axios.put(backURL + '/toggleCollection/' + model._id, {}, { withCredentials: true })
                .then((result) => {
                    setCollec(!collec);
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            alert("Vous devez être connecté pour ajouter un modèle à votre collection");
        }
    };

  return (
    <div style={{ cursor: !jwt ? "not-allowed" : "pointer"}} onClick={handleCollec}> {collec ? "Retirer de la Collection" : "Ajouter à la Collection"}</div>
    )
}

export default CollecButton