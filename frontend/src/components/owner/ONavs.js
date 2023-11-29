import React from 'react'
import NavBar from './includes/Navbar'
import { Outlet } from 'react-router-dom'

function CNavs() {
  return (
    <>
        <NavBar/>
        <div style={{ height: "80px" }}></div>
        <Outlet/>
    </>
  )
}

export default CNavs