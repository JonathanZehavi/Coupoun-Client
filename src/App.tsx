import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import { createGlobalStyle } from 'styled-components';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Register from './components/Register/Register';
import SingleCoupon from './components/Single-Coupon-Page/SingleCoupon';
import { useSelector } from 'react-redux';
import { AppState } from './Redux/app-state';
import { CartProvider } from './components/Context/Cart-Context';
import CreateCouponModal from './components/Modal/CreateCouponModal';
import MyInfoPage from './components/My-Info-Page/MyInfoPage';
import Checkout from './components/Checkout/Checkout';
import Receipt from './components/Receipt/Receipt';
import Coupon from './components/Coupons/Coupon';
import Coupons from './components/Coupons/Coupons';
import Menu from './components/Menu/Menu';
import AdminPage from './components/AdminMGMT/AdminPage';
import SingleCompanyPage from './components/AdminMGMT/SingleCompanyPage';


function App() {

  let openModal = useSelector((state: AppState) => state.openModal)

  const GlobalStyle = createGlobalStyle`
  body {
   font-family: 'Changa', sans-serif;

  }
  `

  return (
    <div className='app'>
      <GlobalStyle />
      {/* <SocketContainer> */}

      <BrowserRouter>
        <CartProvider>
          <Header />
          {openModal && <CreateCouponModal />}
          <Routes>
            <Route path='/' element={<Coupons />} />
            <Route path='/' element={<Menu />} />
            <Route path="/signup" element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/coupon/:id' element={<SingleCoupon />} />
            <Route path='/company/:id' element={<SingleCompanyPage />} />
            <Route path='/myinfo' element={<MyInfoPage />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/receipt' element={<Receipt />} />
            <Route path='/mgmt' element={<AdminPage/>} />
          </Routes>
          <Footer />
        </CartProvider>
      </BrowserRouter>
      {/* </SocketContainer> */}
    </div>
  );
}

export default App;
