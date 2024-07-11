import './App.css';
import Navbar from './component/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from './pages/Shop';
import ShopCategory from './pages/shopCategory';
import Product from './pages/product';
import Cart from './pages/Cart';
import LoginSignup from './pages/loginSignup';
import Footer from './component/Footer/Footer'
import men_banner from './component/assets/banner_mens.png'
import women_banner from './component/assets/banner_women.png'
import kid_banner from './component/assets/banner_kids.png'


function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/men' element={<ShopCategory banner={men_banner} category="men"/>}/>
        <Route path='/women' element={<ShopCategory banner={women_banner} category="women"/>}/>
        <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kids"/>}/>
        <Route path="/product" element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
