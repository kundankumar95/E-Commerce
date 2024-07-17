import './Sidebar.css';
import { Link } from 'react-router-dom';
// import add_product_icon from '../../assets/Product_Cart.svg';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to={'/addproduct'} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          {/* <img src={add_product_icon} alt="Add Product Icon" /> */}
          <p>Add Product</p>
        </div>
      </Link>
      <Link to={'/listproduct'} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          {/* <img src={add_product_icon} alt="Product List Icon" /> */}
          <p>Product List</p>
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;
