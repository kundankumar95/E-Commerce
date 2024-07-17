import './Sidebar.css'
import {Link} from 'react-router-dom'
// import add_product_icon from '../../assets/Product_Cart.svg'


const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={'/addproduct'} style={{textDecorator:"none"}}>
      <div className="sidebar-item">
        {/* <img src={add_product_icon} alt="" /> */}
        <p>Add Product</p>
      </div>
      </Link>
      <Link to={'/listproduct'} style={{textDecorator:"none"}}>
      <div className="sidebar-item">
        {/* <img src={add_product_icon} alt="" /> */}
        <p>Product List</p>
      </div>
      </Link>
    </div>
  )
}

export default Sidebar
