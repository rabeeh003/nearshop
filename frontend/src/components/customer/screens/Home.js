import React from 'react'
import styled from 'styled-components'
import Banner from '../includes/home/Banner'
import OfferCard from '../includes/home/OfferCard'
import CategoryCard from '../includes/home/CategoryCard'
import ShopCard from '../includes/home/ShopCard'
import BaseHome from '../includes/home/BaseHome'

function Home() {
  const loc = JSON.parse(localStorage.getItem('currentLocation'));
  return (
    <Homes>
      <Banner />
      {loc ? (
        <>
          <CategoryCard />
          <OfferCard />
          <ShopCard />
        </>
      ) : (
        <BaseHome />
      )}
    </Homes>
  )
}

const Homes = styled.div`
  max-width: 90vw;
  margin: auto;
  @media screen and (max-width: 578px) {
    max-width: 98vw;
  }
`
export default Home