import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";
import SocketContainer from './components/Context/Socket-Container';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Layout from './components/Layout/Layout';
import Login from './components/Login/Login';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Register from './components/Register/Register';
import Modal from './components/Modal/Modal';
import SingleCoupon from './components/Single-Coupon-Page/SingleCoupon';
import { useSelector } from 'react-redux';
import { AppState } from './Redux/app-state';
import Cart from './components/Cart/Cart';
import { CartProvider, useCart } from './components/Context/Cart-Container';
import CreateCouponModal from './components/Modal/CreateCouponModal';


function App() {

  const {isOpen}: any = useCart()

  let openModal = useSelector((state: AppState) => state.openModal)

  return (
    <div className='app'>
      {/* <SocketContainer> */}
        <CartProvider>
        <BrowserRouter>
          {/* {openModal && <Modal />} */}
            {openModal && <CreateCouponModal />}
        <Header />
          <Cart isOpen={isOpen}/>
          <Routes>
            <Route path='/' element={<Layout />} />
            <Route path="/signup" element={<Register />}/>
            <Route path='/login' element={<Login />} />
            <Route path='/coupon/:id' element={<SingleCoupon />} />
              <Route path='/cart' element={<Cart isOpen={isOpen} />} />
          </Routes>
        <Footer />
        </BrowserRouter>
        </CartProvider>
  {/* </SocketContainer> */}
    </div>
  );
}

export default App;
