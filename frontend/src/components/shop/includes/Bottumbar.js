import React from 'react'
import styled from 'styled-components'

import { Link } from 'react-router-dom';

function Bottumbar() {
    return (
        <>
            
            <BtNav className='bg-admin'>
                <Link title='Home' to="/shop" className='nav-link'> <i className="fa-solid fa-house clr-white"></i></Link>
                <Link title='billing' to="billing" className='nav-link'><i className="fa-solid fa-file-invoice clr-white"></i></Link>
                <Link title='order' to="order" className='nav-link'><i class="fa-solid fa-cart-shopping clr-white"></i></Link>
                <Link title='Add Ptodect' to="addprodect" className='nav-link'><i class="fa-solid fa-square-plus clr-white"></i></Link>
            </BtNav>
        </>
    )
}
const BtNav = styled.div`
    position: fixed;
    z-index: 15;
    bottom: 0;
    width: 100%;
    color: gray;
    font-size: 25px;
    display: none;
    @media screen and (max-width: 578px) {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        padding-bottom: 10px;
        padding-top: 10px;
    }
`
export default Bottumbar