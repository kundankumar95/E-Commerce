import React from 'react'
import './Breadcrum.css'
import Arrow_icon from '../assets/breadcrum_arrow.png'

const Breadcrum = (props) => {
    const {product} = props;
  return (
    <div className='breadcrum'>
      HOME <img src={Arrow_icon} alt="" /> SHOP <img src={Arrow_icon} alt="" /> {product.category} <img src={Arrow_icon} alt="" /> {product.name}
    </div>
  )
}

export default Breadcrum
