import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Route, useNavigate } from 'react-router-dom';
import { AppState } from '../../redux/app-state';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Coupons from '../main/Coupons';
import Menu from '../Menu/Menu';
import './Layout.css';

function Layout() {


  return (
    // <>
    // <div>
    // <section className="layout">
    //     <Menu />
    //   <main className='main'>
    //     <Coupons />
    //   </main>
    // </section>
    // </div>
    // </>

    <section className="layout">
      {/* <header>

      </header> */}

      <aside>
       <Menu />
      </aside>

      <main>
        <Coupons />
      </main>

      {/* <footer>

      </footer> */}
    </section>
  );
}

export default Layout;
