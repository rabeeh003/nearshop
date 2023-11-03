import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from '../src/components/screens/Home'
import Category from './components/screens/Category';
import NavBar from './components/includes/Navbar';
import Bottumbar from './components/includes/Bottumbar';
import NotFont from './components/screens/NotFont';
import CartPage from './components/screens/CartPage';

function App() {
  return (
    <>
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/category' element={<Category/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='*' element={<NotFont/>}/>
      </Routes>
      <Bottumbar/>
    </Router>
    </>
  );
}

export default App;
