import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../src/components/customer/screens/Home'
import Category from './components/customer/screens/Category';
import NotFont from './components/customer/screens/NotFont';
import SNotFont from './components/shop/screens/NotFont'
import CartPage from './components/customer/screens/CartPage';
import UserProfile from './components/customer/screens/UserProfile';
import CheckOut from './components/customer/screens/CheckOut';
import ShopPage from './components/customer/screens/ShopPage';
import UserLogin from './components/customer/screens/UserLogin';
import UserSignup from './components/customer/screens/UserSignup';
import './assets/css/color.css'
import ShopHome from './components/shop/screens/ShopHome';
import CNavs from './components/customer/CNavs';
import SNavs from './components/shop/SNavs';
import Billing from './components/shop/screens/Billing';
import AddProdect from './components/shop/screens/AddProdect';
import EditProdect from './components/shop/screens/EditProdect';
import OfferPage from './components/shop/screens/OfferPage';
import Chart from './components/shop/screens/Chart';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<CNavs />}>
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
            <Route path='*' element={<NotFont />} />
          </Route>
          <Route path='shop' element={<SNavs />} >
            <Route index element={<ShopHome />} />
            <Route path='billing' element={<Billing/>} />
            <Route path='addprodect' element={<AddProdect/>} />
            <Route path='editprodect' element={<EditProdect/>} />
            <Route path='offer' element={<OfferPage/>} />
            <Route path='chart' element={<Chart/>} />
            <Route path='*' element={<SNotFont />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
