import { AiOutlineLogin, AiOutlineLogout, AiOutlineShoppingCart } from 'react-icons/ai'
import { SiGnuprivacyguard } from 'react-icons/si'
import { FcAbout, FcManager, FcStatistics } from 'react-icons/fc'
import { BiUserCircle } from 'react-icons/bi'
import { RiCoupon3Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useCart } from '../Context/Cart-Context'
import "./Header.css"
import { useAuth } from '../Context/AuthProvider'

function Header() {

  const { openCart, cartAmount, isLoggedIn, setIsLoggedIn } = useCart()

  const { tokenDecoded, setAuth } = useAuth()


  let onLogout = () => {
    setIsLoggedIn(false)
    localStorage.clear()
    setAuth(undefined)
  }




  return (
    <>
      <nav className='nav'>
        <div className='navbar_links'>
          <Link className="active" to={'/'}><RiCoupon3Line style={{ fontSize: "35px" }} /> </Link>
          {(isLoggedIn || localStorage.getItem("isLoggedIn")) &&
            <Link className="link" to='myinfo'>My Info  <BiUserCircle /></Link>}
          {(tokenDecoded() === "ROLE_Customer" && (isLoggedIn || localStorage.getItem("isLoggedIn"))) &&
            <button className='cart-button link' onClick={openCart}>Cart<AiOutlineShoppingCart />
              <div className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                style={{
                  color: "white",
                  width: "2rem",
                  height: "2rem",
                  bottom: 0,
                  right: 0,
                  position: "relative",
                  transform: "translate(25%, 25%)"
                }} >
                {cartAmount}
              </div>
            </button>}
          {tokenDecoded() === "ROLE_Admin" &&
            <>
              <Link className='link' to='/mgmt'>MGMT  <FcManager /></Link>
              <Link className='link' to='/statistics'>Stats  <FcStatistics /></Link>
              <Link className='link' to='/guide'>Guide  <FcAbout /></Link>
            </>
          }
          {tokenDecoded() === "ROLE_Company" &&
            <>
              <Link className='link' to='/companystatistics'>Stats  <FcStatistics /></Link>
            </>
          }
        </div>
        <div className='right'>
          {(localStorage.getItem("isLoggedIn") || isLoggedIn) ? <Link className='link' onClick={onLogout} to='/'>Logout <AiOutlineLogout /></Link>
            :
            <>
              <Link className='link' to='login'>Login <AiOutlineLogin /></Link>
              <Link className='link' to='/signup'>Sign Up <SiGnuprivacyguard /></Link>
            </>}
        </div>
      </nav >
    </>
  );
}

export default Header