import { AiOutlineLogin, AiOutlineLogout, AiOutlineShoppingCart } from 'react-icons/ai'
import { SiGnuprivacyguard } from 'react-icons/si'
import { FcManager, FcStatistics } from 'react-icons/fc'
import { BiUserCircle } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useCart } from '../Context/Cart-Context'
import "./Header.css"

function Header() {

  const { openCart, cartAmount, isLoggedIn, setIsLoggedIn } = useCart()


  let onLogout = () => {
    setIsLoggedIn(false)
    localStorage.clear()
  }




  return (

    <>
      <nav className='nav'>
        <div className='navbar_links'>
          <Link style={{ padding: 0 }} to={'/'}><a className="active">Coupons</a></Link>
          {(isLoggedIn || localStorage.getItem("isLoggedIn")) &&
            <Link style={{ padding: 0 }} to='myinfo'><a className="my-info">My Info  <BiUserCircle /></a></Link>}


          {(localStorage.getItem("userRole") === "Customer" && (isLoggedIn || localStorage.getItem("isLoggedIn"))) &&
            <button className='cart-button' onClick={openCart}>Cart<AiOutlineShoppingCart />
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
            {localStorage.getItem("userRole") === "Admin" && 
            <>
            <Link style={{ padding: 0 }} to='/mgmt'><a className="my-info">MGMT  <FcManager /></a></Link>
            <Link style={{ padding: 0 }} to='/statistics'><a className="my-info">Stats  <FcStatistics /></a></Link>
            </>
            }
        </div>
        <div className='right'>
          {(localStorage.getItem("isLoggedIn") || isLoggedIn) ? <Link style={{ padding: 0 }} to='/'><a onClick={onLogout}>Logout <AiOutlineLogout /></a></Link>
            :
            <>
              <Link style={{ padding: 0 }} to='login'><a>Login <AiOutlineLogin /></a></Link>
              <Link style={{ padding: 0 }} to='/signup'><a>Sign Up <SiGnuprivacyguard /></a></Link>
            </>}

        </div>
      </nav >
    </>
  );
}

export default Header