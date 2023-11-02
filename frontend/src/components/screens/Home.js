import React from 'react'

import Navbar from '../includes/Navbar'
import Bottumbar from '../includes/Bottumbar'
import Banner from '../includes/home/Banner'
import OfferCard from '../includes/home/OfferCard'
import CategoryCard from '../includes/home/CategoryCard'
import ShopCard from '../includes/home/ShopCard'

function Home() {
  return (
    <>
      <Banner />
      <OfferCard/>
      <CategoryCard/>
      <ShopCard/>
    </>
  )
}

export default Home