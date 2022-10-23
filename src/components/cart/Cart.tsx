import { useEffect } from 'react'
import { Button, Offcanvas, Stack } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ICoupon } from '../../Model/ICoupon'
import { AppState } from '../../Redux/app-state'
import { CartItems, useCart } from '../Context/Cart-Context'
import './Cart.css'
import CartItem from './CartItem'



type CartProps = {
  isOpen: boolean
}

function Cart({ isOpen }: CartProps) {

  const { closeCart, cartItems } = useCart()

  

  let handleCheckouClick = () => {
      window.location.assign("/checkout")
  }

  let coupons = useSelector((state: AppState) => state.couponsByCategory)

  return (
    <Offcanvas show={isOpen} onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          <>
            {cartItems.map((item: CartItems) => {
              return <CartItem key={item.id} id={item.id} amount={item.amount} />
            })}
          </>
          <div className='ms-auto fw-bold fs-5'>
            Total: ${cartItems.reduce((total: number, cartItem: CartItems) => {
              const item = coupons.find((item: ICoupon) => item.id === cartItem.id)
              return total + (item?.price || 0) * cartItem.amount
            }, 0)}
          </div>
          {cartItems.length > 0 && <Button className='go-to-checkout' onClick={handleCheckouClick} >Go To Checkout</Button>}
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default Cart