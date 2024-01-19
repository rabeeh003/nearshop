import React from 'react'
import styled from 'styled-components'
import Banner from '../includes/home/Banner'
import OfferCard from '../includes/home/OfferCard'
import CategoryCard from '../includes/home/CategoryCard'
import ShopCard from '../includes/home/ShopCard'
import BaseHome from '../includes/home/BaseHome'
import NoUser from '../includes/home/NoUser'

function Home() {
  const user = JSON.parse(localStorage.getItem('userKey'));
  const loc = JSON.parse(localStorage.getItem('currentLocation'));

  return (
    <>
      {loc ? (
        <Homes>
          <Banner />
          <CategoryCard />
          <OfferCard />
          <ShopCard />
        </Homes>
      ) : (
        <>
          {user ? '' : (
            <NoUser />
          )}
          <BaseHome />
        </>
      )}
    </>
  )
}

const Homes = styled.div`
  padding-top: 10px;
  max-width: 90vw;
  margin: auto;
  @media screen and (max-width: 578px) {
    max-width: 98vw;
  }
`
export default Home