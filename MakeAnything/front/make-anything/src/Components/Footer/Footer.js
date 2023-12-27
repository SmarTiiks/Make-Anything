import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'

function Footer() {
  return (
    <div className='footer'>
        <div>© 2023 MakeAnyting</div>
        <div className='footer_links'>
            <a className='fb' href="https://www.facebook.com/MakeAnything-100500101987654"><img src='http://localhost:5000/fb.png'/></a>
            <a href="https://tiktok.com/MakeAnything"><img src='http://localhost:5000/tiktok.png'/></a>
            <a href="https://www.instagram.com/makeanything/"><img src='http://localhost:5000/insta.jpg'/></a>
            <a href="https://www.youtube.com/channel/MakeAnything"><img src='http://localhost:5000/YT.png'/></a>
        </div>
    </div>
  )
}

export default Footer