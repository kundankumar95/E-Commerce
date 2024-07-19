import './Navbar.css'
import navlogo from '../../assets/logo.png'
// import navProfile from '../../assets/pic-admin (1).png'

const Navbar = () => {
  return (
    <>
      <div className='navbar'>
        <img src={navlogo} alt="Shopper Logo" className="nav-logo"/>
        {/* <img src={navProfile} alt="Admin Profile" /> */}
        <h1>SHOPPER</h1>
        
      </div>
      <hr/>

    </>
  )
}

export default Navbar
