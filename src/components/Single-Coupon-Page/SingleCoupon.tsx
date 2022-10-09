import axios from 'axios';
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { BiPurchaseTag } from 'react-icons/bi';
import { MdDeleteForever } from 'react-icons/md';
import { TbShoppingCartPlus } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IUser } from '../../Model/IUser';
import { ActionType } from '../../Redux/action-type';
import { AppState } from '../../Redux/app-state';
import { useCart } from '../Context/Cart-Container';
import './SingleCoupon.css'


function SingleCoupon() {

  let dispatch = useDispatch();

  let navigate = useNavigate()

  const { getAmountOfItems, increaseCartAmount, decreaseCartAmount, removeFromCart }: any = useCart()

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
    
    const amountOfItems = getAmountOfItems(coupon.id)
    
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
            {!localStorage.getItem('userRole') && (<Button onClick={() => navigate("/login")}>Log In</Button>)}

            {localStorage.getItem('userRole') === "Customer" &&
              <div className='mt-auto'>
                {amountOfItems == 0 ? (
                  <button onClick={() => increaseCartAmount(coupon.id)} className='add_to_cart'>+ Add To Cart <TbShoppingCartPlus />
                  </button>
                ) : <div className='d-flex align-items-center flex-column' style={{ gap: ".5rem" }}>
                  <div className='d-flex align-items-center justify-content-center' style={{ gap: ".5rem" }}>
                    <Button onClick={() => decreaseCartAmount(coupon.id)}>-</Button>
                    <div>
                      <span className='fs-3'>{amountOfItems}</span>
                      &ensp;In Cart
                    </div>
                    <Button className='w-10' onClick={() => increaseCartAmount(coupon.id)}>+</Button>
                  </div>
                  <Button onClick={() => removeFromCart(coupon.id)} variant='danger'>Remove</Button>
                </div>}

              </div>
            }
            {localStorage.getItem('userRole') === "Admin" &&
              <Button className='delete_coupon_button bg-dangarous' onClick={() => deleteCoupon(coupon.id)}>Delete<MdDeleteForever /></Button>}
          </div>
      </div>
    </div>}
    </div>
  )
}

export default SingleCoupon

