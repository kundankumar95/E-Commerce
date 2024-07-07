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
                <h1>Contact</h1>
                <a href="/"><i class="fa-solid fa-house"></i>A-1/Bangalore/India</a>
                
                <a href="/"><i class="fa-solid fa-phone"></i>+919501234567</a>
                <a href="/"><i class="fa-solid fa-envelope"></i>Shopper@gmail.com</a>
            </div>

            <div className="tag">
                <h1>Get Help</h1>
                <a href="/" class="center">FAQ</a>
                <a href="/" class="center">Shipping</a>
                <a href="/" class="center">Returns</a>
                <a href="/" class="center">Payment Options</a>
            </div>

            <div className="tag">
                <h1>Our Stores</h1>
                <a href="/" class="center">Bangalore</a>
                <a href="/" class="center">Chennai</a>
                <a href="/" class="center">Mumbai</a>
                <a href="/" class="center">New Delhi</a>
            </div>

            <div className="tag">
                <h1>Follw Us</h1>
                <div class="social_link">
                    <img src={pintester_icon} alt=''/>
                    <img src={instagram_icon} alt=''/>
                    <img src={whatsapp_icon} alt=''/>                  
                </div>
            </div>
        </div>
    </footer>
    </div>
  )
}

export default Footer
