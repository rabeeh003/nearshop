import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {PrivateRoute, LoginRoute, CustomerPrivetRoute, CustomerLoginRoute} from './utils/PriveteRoute';

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
import ShopLogin from './components/shop/screens/ShopLogin';
import OwnerSignup from './components/shop/screens/OwnerSignup';
import OtpPage from './components/shop/screens/OtpPage';
import COtpPage from './components/customer/screens/OtpPage';
import ShopCreate from './components/shop/screens/ShopCreate';
import EditShopInfo from './components/shop/screens/EditShopInfo';
import OGCPage from './components/shop/screens/OGCPage';
import OrderPage from './components/shop/screens/OrderPage';
import GlobalProdectAdd from './components/shop/screens/GlobalProdectAdd';
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
              <Route path='order' element={<CustomerPrivetRoute><CheckOut /></CustomerPrivetRoute>} />
            </Route>
            <Route path='user' element={<CustomerPrivetRoute><UserProfile /></CustomerPrivetRoute>} />
            <Route path='shopid' element={<ShopPage />} />
            <Route path='login' element={<CustomerLoginRoute><UserLogin /></CustomerLoginRoute>} />
            <Route path='signup' element={<CustomerLoginRoute><UserSignup /></CustomerLoginRoute>} />
            <Route path='otp_verification' element={<CustomerLoginRoute><COtpPage/></CustomerLoginRoute>} />
            <Route path='*' element={<NotFont />} />
          </Route>
          <Route path='shop' element={<SNavs />} >
            <Route index element={<PrivateRoute><ShopHome /></PrivateRoute>} />
            <Route path='billing' element={<PrivateRoute> <Billing/></PrivateRoute>} />
            <Route path='addprodect' element={<PrivateRoute><AddProdect/></PrivateRoute>} />
            <Route path='editprodect' element={<PrivateRoute><EditProdect/></PrivateRoute>} />
            <Route path='offer' element={<PrivateRoute><OfferPage/></PrivateRoute>} />
            <Route path='chart' element={<PrivateRoute><Chart/></PrivateRoute>} />
            <Route path='login' element={<LoginRoute><ShopLogin/></LoginRoute>} />
            <Route path='signup' element={<LoginRoute><OwnerSignup/></LoginRoute>} />
            <Route path='otp_verification' element={<LoginRoute><OtpPage/></LoginRoute>} />
            <Route path='ogc_verification' element={<PrivateRoute><OGCPage/></PrivateRoute>} />
            <Route path='start_shop' element={<PrivateRoute><ShopCreate/></PrivateRoute>} />
            <Route path='edit_shop_info' element={<PrivateRoute><EditShopInfo/></PrivateRoute>} />
            <Route path='order' element={<PrivateRoute><OrderPage/></PrivateRoute>} />
            <Route path='global_product_add' element={<PrivateRoute><GlobalProdectAdd/></PrivateRoute>} />
            <Route path='*' element={<SNotFont />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
