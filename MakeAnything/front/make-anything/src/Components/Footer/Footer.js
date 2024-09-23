import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'

function Footer() {
  return (
    <div className='footer'>
        <div>© 2023 MakeAnyting</div>
        <div className='footer_links'>
            <a className='fb' href="https://www.facebook.com/MakeAnything-100500101987654" target="_blank"><img src ='/fb.png'/></a>
            <a href="https://tiktok.com/MakeAnything" target="_blank"><img src ='/tiktok.png'/></a>
            <a href="https://www.instagram.com/makeanything/" target="_blank"><img src ='/insta.jpg'/></a>
            <a href="https://www.youtube.com/channel/MakeAnything" target="_blank"><img src ='/YT.png'/></a>
        </div>
    </div>
  )
}

export default Footer