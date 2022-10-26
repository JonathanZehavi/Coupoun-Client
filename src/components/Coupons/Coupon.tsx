import axios from 'axios'
import { TbShoppingCartPlus } from 'react-icons/tb'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ICoupon } from '../../Model/ICoupon'
import { MdDeleteForever, MdEditNote } from 'react-icons/md'
import { ActionType } from '../../Redux/action-type'
import { useCart } from '../Context/Cart-Context'
import { Button } from 'react-bootstrap'
import Coupons from './Coupons'

export interface IProps {
  coupon: ICoupon
}

function Coupon(props: IProps) {

  const { getAmountOfItems, increaseCartAmount, decreaseCartAmount, removeFromCart }: any = useCart()

  const amountOfItems = getAmountOfItems(props.coupon.id)

  let dispatch = useDispatch()
  let navigate = useNavigate()

  async function getCouponById(id: number) {
    axios.get(`http://localhost:8080/coupons/${id}`)
      .then(response => {
        let serverResponse = response.data
        dispatch({ type: ActionType.getCouponById, payload: serverResponse })
      }
      )
      .catch(error => alert(error.message));
  }

  const deleteCoupon = (id: number) => {
    if (window.confirm("Are you sure you want to delete?")) {
      axios.delete(`http://localhost:8080/coupons/${id}`, {
        headers: {
          'Authorization': `${localStorage.getItem('token')}`
        },
      }
      )
    }
  }

  let handleEditClick = () => {
    localStorage.setItem("EditMode", "true")
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
              <img src={props.coupon.image} alt='coupon-img' />
            </Link>
          </div>
          <div className="card_body">
            <h4 className='tag tag_teal'>{props.coupon.category}</h4>
            <h5 className='coupons-title' style={{ fontWeight: "bold" }}>{props.coupon.title}</h5>
            <p className='coupons-description' style={{ fontWeight: "bold" }}>{props.coupon.description}</p>
            <p className='price-tag'>${props.coupon.price}</p>
          </div>
          {props.coupon.amount ?
            <div className='buttons-on-coupons'>
              {!localStorage.getItem('userRole') && (<Button className='login_coupon_button bg-dangarous w-50' style={{ border: "none" }} onClick={() => navigate("/login")}>Log In to order</Button>)}
              {localStorage.getItem('userRole') === "Customer" &&
                <div >
                  {amountOfItems === 0 ?
                    (<Button onClick={() => increaseCartAmount(props.coupon.id)} className='add-to-cart bg-success w-100' style={{ border: "none" }}>+ Add To Cart <TbShoppingCartPlus />
                    </Button>)
                    : <div className='d-flex align-items-center flex-column' style={{ gap: ".5rem" }}>
                      <div className='d-flex align-items-center justify-content-center' style={{ gap: ".5rem" }}>
                        <Button className='button-add-to-cart-amount' onClick={() => decreaseCartAmount(props.coupon.id)}>-</Button>
                        <div>
                          <span className='fs-3'>{amountOfItems}</span>
                          &ensp;In Cart
                        </div>
                        {props.coupon.amount > amountOfItems ?
                          <Button className='button-add-to-cart-amount' onClick={() => increaseCartAmount(props.coupon.id)}>+</Button>
                          :
                          <Button className='button-add-to-cart-amount' >+</Button>
                        }
                      </div>
                      <Button onClick={() => removeFromCart(props.coupon.id)} variant='danger'>Remove</Button>
                    </div>}
                </div>}
            </div>
            :
            <div className='buttons-on-coupons-out-of-stock'>
              <Button>OUT OF STOCK</Button>
            </div>

          }
          {(localStorage.getItem('userRole') === "Admin" || localStorage.getItem('userRole') === "Company") &&
            <div className='delete-and-edit-coupon-container'>
              <><Button className='delete_coupon_button bg-danger' style={{ fontSize: "10px", border: "none" }} onClick={() => deleteCoupon(props.coupon.id)}>Delete<MdDeleteForever /></Button>
                <Link to={`/coupon/${props.coupon.id}`}>
                  <Button className='edit_coupon_button bg-warning' style={{ fontSize: "10px", border: "none" }} onClick={handleEditClick}>Edit<MdEditNote /></Button>
                </Link></>
            </div>
          }
        </div>
      </>
    </div>
  )
}

export default Coupon