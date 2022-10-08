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


function App() {

  let openModal = useSelector((state: AppState) => state.openModal)
  console.log(openModal);


  return (
    <div className='app'>
      <SocketContainer>
        <BrowserRouter>
          {openModal && <Modal />}
        <Header />
          {/* <Header /> */}
          <Routes>
            <Route path='/' element={<Layout />} />
            <Route path="/signup">
              <Route index element={<Register />} />
            </Route>
            {/* <Route path='/registered-succesfuly'>
          <Route index element={<SuccesfulRegistration />} />
        </Route> */}
            <Route path='/login'>
              <Route index element={<Login />} />
            </Route>
            {/* <Route path='/login-succesfuly'>
          <Route index element={<SuccesfulLogin />} />
        </Route> */}
            <Route path='/coupon/:id'>
              <Route index element={<SingleCoupon />} />
            </Route>
            <Route path='/cart'>
              <Route index element={<Cart />} />
            </Route>
          </Routes>
          {/* <Footer /> */}
        <Footer />
        </BrowserRouter>
      </SocketContainer>
    </div>
  );
}

export default App;
