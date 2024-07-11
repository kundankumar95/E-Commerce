import React from 'react'
import Hero from '../component/Hero/Hero'
import Popular from '../component/popular/popular';
import Offers from '../component/offers/offers';
import NewCollections from '../component/NewCollections/NewCollections';
import NewLetter from '../component/NewsLetter/NewLetter';

const shop = () => {
  return (
    <div>
      <Hero/>
      <Popular/>
      <Offers/>
      <NewCollections/>
      <NewLetter/>
    </div>
  )
}

export default shop
