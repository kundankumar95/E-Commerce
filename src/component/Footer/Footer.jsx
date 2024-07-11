import React from 'react'
import './Footer.css'
//import footer_logo from '../assets/logo_big.png'
import instagram_icon from '../assets/instagram_icon.png'
import pintester_icon from '../assets/pintester_icon.png'
import whatsapp_icon from '../assets/whatsapp_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
      <footer>
        <div className="footer_main">
            <div className="tag">
                <h1 className='tag-contact'>Contact</h1>
                <a href="/"><i className="fa-solid fa-house"></i>A-1/Bangalore/India</a>
                
                <a href="/"><i className="fa-solid fa-phone"></i>+919501234567</a>
                <a href="/"><i className="fa-solid fa-envelope"></i>Shopper@gmail.com</a>
            </div>

            <div className="tag">
                <h1 className='tag-get-touch'>Get Help</h1>
                <a href="/" className="center">FAQ</a>
                <a href="/" className="center">Shipping</a>
                <a href="/" className="center">Returns</a>
                <a href="/" className="center">Payment Options</a>
            </div>

            <div className="tag">
                <h1 className='tag-our-store'>Our Stores</h1>
                <a href="/" className="center">Bangalore</a>
                <a href="/" className="center">Chennai</a>
                <a href="/" className="center">Mumbai</a>
                <a href="/" className="center">New Delhi</a>
            </div>

            <div className="tag">
                <h1 className='tag-follow-us'>Follw Us</h1>
                <div className="social_link">
                    <img className='tag-follow-us' src={pintester_icon} alt=''/>
                    <img className='tag-follow-us' src={instagram_icon} alt=''/>
                    <img className='tag-follow-us' src={whatsapp_icon} alt=''/>                  
                </div>
            </div>
        </div>
    </footer>
    </div>
  )
}

export default Footer
