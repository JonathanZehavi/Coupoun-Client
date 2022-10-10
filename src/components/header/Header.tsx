import { AiOutlineLogin, AiOutlineLogout, AiOutlineShoppingCart } from 'react-icons/ai'
import { SiGnuprivacyguard } from 'react-icons/si'
import { useCart } from '../Context/Cart-Container'
import "./Header.css"

function Header() {

  const { openCart, cartAmount, logOut }: any = useCart()


  let onLogout = () => {
    logOut()
    localStorage.clear();
  }


  return (

    <nav className='nav'>
      <div className='navbar_links'>
        <a className="active" href="/">Coupons</a>
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
              }}
            >{cartAmount}</div>
          </button>
      </div><div className='right'>

        {localStorage.getItem('userRole') && <button className='logout-button' onClick={onLogout}>
          <a href='/' onClick={logOut}>Logout <AiOutlineLogout /></a>
        </button>}
        {!localStorage.getItem('userRole') &&
          <><a href="/login">Login <AiOutlineLogin /></a><a href="/signup">Sign Up <SiGnuprivacyguard />
          </a></>}

      </div>
    </nav>
  );
}

export default Header