import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BiPurchaseTag } from 'react-icons/bi';
import { TbShoppingCartPlus } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ICoupon } from '../../model/ICoupon'
import { IUser } from '../../model/IUser';
import { ActionType } from '../../redux/action-type';
import { AppState } from '../../redux/app-state';
import Coupon from '../main/Coupon';
import './SingleCoupon.css'


function SingleCoupon() {

  let dispatch = useDispatch();

  let user: IUser = useSelector((state: AppState) => state.user)

  const [openModal, setOpenModal] = useState<boolean>(false)


  async function deleteCoupon(id: number) {
    axios.delete(`http://localhost:8080/coupons/${id}`)
      .then(response => {
        dispatch({ type: ActionType.getAllCoupons, payload: id })
      }
      )
      .catch(error => alert(error.message));
  }


  async function getCouponById(id: number) {
    axios.get(`http://localhost:8080/coupons/${id}`)
      .then(response => {
        let serverResponse = response.data
        dispatch({ type: ActionType.getCouponById, payload: serverResponse })
        return serverResponse;
      }
      )
      .catch(error => alert(error.message));
  }


  const [coupon, setCoupon] = useState<{[key:string]:string | number | any}>({})
  console.log(coupon);
  
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/coupons/${id}`).then(data => data.json()).then(setCoupon);
  }, [])

  let handleBuyNowClick = () => {
      if (!localStorage.getItem("userRole")){
        setOpenModal(true)
        dispatch({type:ActionType.openModal, payload: openModal})
      }
  }



  return (
    <div className='page_container'>
    {coupon.id && <div key={coupon.id} className='coupons_card'>
      <div className='card_header'>
        <img className='image_on_single_coupon' src={coupon.image} />
      </div>
      <div className="card_body_single_coupon">
        <h4 className='category category_teal'>{coupon.category}</h4>
        <p>{coupon.description}</p>
        <p>Start At: {coupon.startDate[2]}/{coupon.startDate[1]}/{coupon.startDate[0]}</p>
        <p>Offer Expiration Date: {coupon.endDate[2]}/{coupon.endDate[1]}/{coupon.endDate[0]}</p>
        <p>Price: ${coupon.price}</p>
        <div className='buttons_on_coupon'>
            <button onClick={handleBuyNowClick}>Buy Now <BiPurchaseTag /></button>
          <button>Add To Cart <TbShoppingCartPlus /></button>
        {user?.role === "Admin" && <button className='delete_coupon_button' onClick={() => deleteCoupon(coupon.id)}>Delete</button>}
        </div>
      </div>
    </div>}
    </div>
  )
}

export default SingleCoupon

