import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../component/Breadcrum/Breadcrum';
import ProductDisplay from '../component/ProductDisplay/ProductDisplay';
import Description from '../component/Description/Description';
import RelatedProduct from '../component/RelatedProduct.jsx/RelatedProduct';

const Product = () => {
   const { all_product } = useContext(ShopContext);
   const { productId } = useParams();
   const product = all_product.find((e) => e.id === Number(productId));
   
   return (
    <div className='product'>
      <Breadcrum product={product} />
      <ProductDisplay product={product}/>
      <Description/>
      <RelatedProduct/>
    </div>
  );
}

export default Product;

