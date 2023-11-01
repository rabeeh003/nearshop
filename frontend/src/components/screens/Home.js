import React from 'react'

import Navbar from '../includes/Navbar'
import Bottumbar from '../includes/Bottumbar'
import Banner from '../includes/Banner'
import OfferCard from '../includes/OfferCard'
import Category from '../includes/Category'

function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <OfferCard/>
      <Category/>
      <Bottumbar />
    </>
  )
}

export default Home