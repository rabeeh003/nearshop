import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../src/components/customer/screens/Home'
import Category from './components/customer/screens/Category';
import NavBar from './components/customer/includes/Navbar';
import Bottumbar from './components/customer/includes/Bottumbar';
import NotFont from './components/customer/screens/NotFont';
import CartPage from './components/customer/screens/CartPage';
import UserProfile from './components/customer/screens/UserProfile';
import CheckOut from './components/customer/screens/CheckOut';
import ShopPage from './components/customer/screens/ShopPage';
import UserLogin from './components/customer/screens/UserLogin';
import UserSignup from './components/customer/screens/UserSignup';
import './assets/css/color.css'
import ShopHome from './components/shop/screens/ShopHome';
import CNavs from './components/customer/CNavs';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<CNavs/>}>
            <Route index element={<Home />} />
            <Route path='category' element={<Category />} />
            <Route path='cart'>
              <Route index element={<CartPage />} />
              <Route path='order' element={<CheckOut />} />
            </Route>
            <Route path='user' element={<UserProfile />} />
            <Route path='shopid' element={<ShopPage />} />
            <Route path='login' element={<UserLogin />} />
            <Route path='signup' element={<UserSignup />} />
          </Route>
          <Route path='shop'>
            <Route index element={<ShopHome />} />
          </Route>
          <Route path='*' element={<NotFont />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
