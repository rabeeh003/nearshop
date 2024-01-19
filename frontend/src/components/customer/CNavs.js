import React from 'react'
import NavBar from './includes/Navbar'
import Bottumbar from './includes/Bottumbar'
import { Outlet } from 'react-router-dom'

function CNavs() {
  return (
    <>
        <NavBar/>
        <Bottumbar/>
        <div style={{ height: "70px" }}></div>
        <Outlet/>
        <div style={{ height: "80px" }}></div>
    </>
  )
}

export default CNavs