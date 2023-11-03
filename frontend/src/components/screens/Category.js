import React from 'react'

import styled from 'styled-components'
import CategoryCard from '../includes/category/CategoryCard'
import ShopCard from '../includes/category/ShopCard'

function Category() {
  return (
    <Cato>
      <CategoryCard/>
      <ShopCard/>
    </Cato>
  )
}

const Cato = styled.div`
  max-width: 90vw;
  margin: auto;
  @media screen and (max-width: 578px) {
    max-width: 98vw;
  }
`
export default Category