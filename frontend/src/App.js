import React, { useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {PrivateRoute, LoginRoute, CustomerPrivetRoute, CustomerLoginRoute, OwnerLoginRoute, OwnerPrivateRoute} from './utils/PriveteRoute';

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
import COtpPage from './components/customer/screens/OtpPage';
import EditShopInfo from './components/shop/screens/EditShopInfo';
import OGCPage from './components/shop/screens/OGCPage';
import OrderPage from './components/shop/screens/OrderPage';
import GlobalProdectAdd from './components/shop/screens/GlobalProdectAdd';
// owner
import GoogleAuth from './components/owner/screen/auth'
import OwnerRegister from './components/owner/screen/register'
import OwnerLogin from './components/owner/screen/login'
import OwnerHome from './components/owner/screen/home'
import CreateShop from './components/owner/screen/CreateShop'
import ONavs from './components/owner/ONavs'
import Invoice from './components/customer/includes/Profile/Invoice';
import CategoryOfferPage from './components/shop/screens/CatagoryOfferPage';
function App() {
  useEffect(() => {
    if (window.navigator.msApplication && window.navigator.msApplication.install) {
      window.navigator.msApplication.install();
    }
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<CNavs />}>
            <Route index element={<Home />} />
            <Route path='category/:categoryName' element={<Category />} />
            <Route path='cart'>
              <Route index element={<CartPage />} />
              <Route path='checkout' element={<CustomerPrivetRoute><CheckOut /></CustomerPrivetRoute>} />
            </Route>
            <Route path='user'>
              <Route index element={<CustomerPrivetRoute><UserProfile /></CustomerPrivetRoute>} />
              <Route path='invoice' element={<CustomerPrivetRoute><Invoice /></CustomerPrivetRoute>} />
            </Route>
            <Route path='/:shop_id' element={<ShopPage />} />
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
            <Route path='catagory_offer' element={<PrivateRoute><CategoryOfferPage/></PrivateRoute>} />
            <Route path='chart' element={<PrivateRoute><Chart/></PrivateRoute>} />
            <Route path='login' element={<LoginRoute><ShopLogin/></LoginRoute>} />
            <Route path='signup' element={<LoginRoute><OwnerSignup/></LoginRoute>} />
            <Route path='ogc_verification' element={<PrivateRoute><OGCPage/></PrivateRoute>} />
            <Route path='edit_shop_info' element={<PrivateRoute><EditShopInfo/></PrivateRoute>} />
            <Route path='order' element={<PrivateRoute><OrderPage/></PrivateRoute>} />
            <Route path='global_product_add' element={<PrivateRoute><GlobalProdectAdd/></PrivateRoute>} />
            <Route path='*' element={<SNotFont />} />
          </Route>
          <Route path='owner' element={<ONavs />} >
            <Route index element={<OwnerPrivateRoute><OwnerHome /></OwnerPrivateRoute>} />
            <Route path='createshop' element={<OwnerPrivateRoute><CreateShop /></OwnerPrivateRoute>} />
            <Route path='auth' element={<OwnerLoginRoute> <GoogleAuth/></OwnerLoginRoute>} />
            <Route path='login' element={<OwnerLoginRoute> <OwnerLogin/></OwnerLoginRoute>} />
            <Route path='signup' element={<OwnerLoginRoute><OwnerRegister/></OwnerLoginRoute>} />
            <Route path='*' element={<SNotFont />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
