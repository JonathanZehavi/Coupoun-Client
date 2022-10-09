import axios from 'axios'
import React, { useState } from 'react'
import { BiPurchaseTag } from 'react-icons/bi'
import { TbShoppingCartPlus } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ICoupon } from '../../Model/ICoupon'
import { MdDeleteForever } from 'react-icons/md'
import { IUser } from '../../Model/IUser'
import { ActionType } from '../../Redux/action-type'
import { AppState } from '../../Redux/app-state'
import Amount from '../Amount/Amount'
import { useCart } from '../Context/Cart-Container'
import { Button } from 'react-bootstrap'

export interface IProps {
  coupon: ICoupon
}

function Coupon(props: IProps) {

  const { getAmountOfItems, increaseCartAmount, decreaseCartAmount, removeFromCart }: any = useCart()

  const amountOfItems = getAmountOfItems(props.coupon.id)


  let dispatch = useDispatch()
  let navigate = useNavigate()

  let user: IUser = useSelector((state: AppState) => state.user)


  async function getCouponById(id: number) {
    axios.get(`http://localhost:8080/coupons/${id}`)
      .then(response => {
        let serverResponse = response.data
        dispatch({ type: ActionType.getCouponById, payload: serverResponse })
      }
      )
      .catch(error => alert(error.message));
  }

  async function deleteCoupon(id: number) {
    axios.delete(`http://localhost:8080/coupons/${id}`)
      .then(response => {
        dispatch({ type: ActionType.getAllCoupons, payload: id })
      }
      )
      .catch(error => alert(error.message));
  }

  let handleCouponSelected = (currentId: number) => {
    getCouponById(currentId)
  }


  return (
    <div>

      <>
        <div key={props.coupon.id} className='coupon_card'>


          <div className='card_header_on_home_page'>
            <Link className='link_to_coupon' to={`/coupon/${props.coupon.id}`} onClick={() => handleCouponSelected(props.coupon.id)}>
              <img src={props.coupon.image} />
            </Link>
          </div>


          <div className="card_body">
            <h4 className='tag tag_teal'>{props.coupon.category}</h4>
            <h5 style={{ fontWeight: "bold" }}>{props.coupon.title}</h5>
            <p>{props.coupon.description}</p>
            <p>Start At: {props.coupon.startDate[2]}/{props.coupon.startDate[1]}/{props.coupon.startDate[0]}</p>
            <p>Offer Expiration Date: {props.coupon.endDate[2]}/{props.coupon.endDate[1]}/{props.coupon.endDate[0]}</p>
            <p>Price: ${props.coupon.price}</p>
          </div>
          {localStorage.getItem('userRole') !== "Admin" && <>

          </>
          }
          {/* <button className='buy_now' onClick={handleBuyNowWhenNotLoggedInClick}>Buy Now <BiPurchaseTag /></button>  */}

          <div className='buttons_on_coupon'>
            {!localStorage.getItem('userRole') && (<Button onClick={() => navigate("/login")}>Log In</Button>)}

            {localStorage.getItem('userRole') === "Customer" &&
              <div className='mt-auto'>
                {amountOfItems == 0 ? (
                  <button onClick={() => increaseCartAmount(props.coupon.id)} className='add_to_cart'>+ Add To Cart <TbShoppingCartPlus />
                  </button>
                ) : <div className='d-flex align-items-center flex-column' style={{ gap: ".5rem" }}>
                  <div className='d-flex align-items-center justify-content-center' style={{ gap: ".5rem" }}>
                    <Button onClick={() => decreaseCartAmount(props.coupon.id)}>-</Button>
                    <div>
                        <span className='fs-3'>{amountOfItems}</span>
                        &ensp;In Cart
                    </div>
                    <Button className='w-10' onClick={() => increaseCartAmount(props.coupon.id)}>+</Button>
                  </div>
                  <Button onClick={() => removeFromCart(props.coupon.id)} variant='danger'>Remove</Button>
                </div>}

              </div>
            }
            {localStorage.getItem('userRole') === "Admin" &&
              <Button className='delete_coupon_button bg-dangarous' onClick={() => deleteCoupon(props.coupon.id)}>Delete<MdDeleteForever /></Button>}
          </div>


        </div>
      </>
    </div>
  )
}

export default Coupon