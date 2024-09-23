import React from 'react'
import './FilterBar.css'
import { useNavigate } from 'react-router-dom'
import { JwtContext } from '../JWTContext'
import { useContext } from 'react'

function FilterBar({current}) {

    const navigate = useNavigate();

    const [jwt, setJwt, refresh, setRefresh] = useContext(JwtContext);

    const handleRedirect = (tag) => {
        navigate('/accueil/' + tag + "0");
        setRefresh(refresh === 0 ? 1 : 0);
    }

  return (
    <div className='filter-bar'>
        <div onClick={() => handleRedirect("recent")} className={current == "recent" ? "filter-tag navbarlink current" : "filter-tag navbarlink"}>Modèles Récents</div>
        <div onClick={() => handleRedirect("download")} className={current == "download" ? "filter-tag navbarlink current" : "filter-tag navbarlink"}>Les plus téléchargés</div>
        <div onClick={() => handleRedirect("decoration")} className={current == "decoration" ? "filter-tag navbarlink current" : "filter-tag navbarlink"}>Décoration</div>
        <div onClick={() => handleRedirect("gadget")} className={current == "gadget" ? "filter-tag navbarlink current" : "filter-tag navbarlink"}>Gadget</div>
        <div onClick={() => handleRedirect("rangement")} className={current == "rangement" ? "filter-tag navbarlink current" : "filter-tag navbarlink"}>Rangement</div>
        <div onClick={() => handleRedirect("figurine")} className={current == "figurine" ? "filter-tag navbarlink current" : "filter-tag navbarlink"}>Figurine</div>
        <div onClick={() => handleRedirect("bricolage")} className={current == "bricolage" ? "filter-tag navbarlink current" : "filter-tag navbarlink"}>Bricolage</div>
    </div>
  )
}

export default FilterBar