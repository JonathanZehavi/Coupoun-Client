import React, { useState } from 'react'
import { Offcanvas, OffcanvasHeader, OffcanvasTitle, Stack } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { ICoupon } from '../../Model/ICoupon'
import { AppState } from '../../Redux/app-state'
import { useCart } from '../Context/Cart-Container'
import './Cart.css'
import CartItem from './CartItem'


type CartProps = {
  isOpen: boolean
}

function Cart({ isOpen }: CartProps) {

  const { closeCart, cartItems }: any = useCart()

  let coupons = useSelector((state:AppState) => state.couponsByCategory)

  return (
    <Offcanvas show={isOpen} onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          <>
            {cartItems.map((item: any) => {
              return <CartItem key={item.id} id={item.id} amount={item.amount} />
            })}
          </>
          <div className='ms-auto fw-bold fs-5'>
            Total: ${cartItems.reduce((total: any, cartItem: any) => {
              const item = coupons.find((item: ICoupon) => item.id === cartItem.id)
              return total + (item?.price || 0) * cartItem.amount
            }, 0)}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default Cart