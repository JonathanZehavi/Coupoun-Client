import React, { useEffect, useState } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { AiOutlineLogin, AiOutlineLogout, AiOutlineShoppingCart } from 'react-icons/ai'
import { SiGnuprivacyguard } from 'react-icons/si'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IUser } from '../../model/IUser'
import { ActionType } from '../../redux/action-type'
import { AppState } from '../../redux/app-state'
import "./Header.css"

function Header() {
  let dispatch = useDispatch()
  let navigate = useNavigate()

  let isLogedIn = useSelector((state:AppState) => state.isLogedIn)
  console.log(isLogedIn);
  

  // const [isLogedIn, setIsLogedIn] = useState<boolean>(false)


  let onLogout = () => {
    dispatch({ type: ActionType.isLogedIn, payload: false })
    localStorage.clear();
  }

// useEffect(() => {
//   if (localStorage.getItem("userRole")){
//     setIsLogedIn(true)
//   }
// }, [])


  return (

    <nav className='nav'>
      <div className='navbar_links'>
        <a className="active" href="/">Coupons</a>
        <a href="#about">Cart <AiOutlineShoppingCart /></a>
      </div>

      <div className='right'>

        {isLogedIn && <a href='/' onClick={onLogout}>Logout <AiOutlineLogout /></a>}
        {!isLogedIn && <>
          <a href="/login">Login <AiOutlineLogin /></a>
          <a href="/signup">Sign Up <SiGnuprivacyguard /></a>
        </>}
      </div>

    </nav>
  );
}

export default Header