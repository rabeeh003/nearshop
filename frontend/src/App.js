import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../src/components/screens/Home'
import Category from './components/screens/Category';
import NavBar from './components/includes/Navbar';
import Bottumbar from './components/includes/Bottumbar';
import NotFont from './components/screens/NotFont';
import CartPage from './components/screens/CartPage';
import UserProfile from './components/screens/UserProfile';
import CheckOut from './components/screens/CheckOut';
import ShopPage from './components/screens/ShopPage';
import UserLogin from './components/screens/UserLogin';
import UserSignup from './components/screens/UserSignup';
import './assets/css/color.css'
function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='category' element={<Category />} />
          <Route path='cart'>
            <Route index element={<CartPage />} />
            <Route path='order' element={<CheckOut />} />
          </Route>
          <Route path='user' element={<UserProfile />} />
          <Route path='shopid' element={<ShopPage/>} />
          <Route path='login' element={<UserLogin/>} />
          <Route path='signup' element={<UserSignup/>} />

          <Route path='*' element={<NotFont />} />
        </Routes>
        <Bottumbar />
      </Router>
    </>
  );
}

export default App;
