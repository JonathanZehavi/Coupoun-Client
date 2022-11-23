import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ICoupon } from '../../Model/ICoupon';
import { IPurchase } from '../../Model/IPurchase';
import { ActionType } from '../../Redux/action-type';
import { AppState } from '../../Redux/app-state';
import CartItem from '../Cart/CartItem';
import { CartItems, useCart } from '../Context/Cart-Context'
import LoadingSpinner from '../Login/LoadingSpinner';
import './Checkout.css'

function Checkout() {

  const { cartItems } = useCart()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [purchaseId, setPurchaseId] = useState<number>(0)


  let dispatch = useDispatch()
  let navigate = useNavigate()

  let coupons = useSelector((state: AppState) => state.coupons)


  async function getCoupons() {
    axios.get("http://localhost:8080/coupons")
      .then(response => {
        let serverResponse = response.data
        dispatch({ type: ActionType.getAllCoupons, payload: serverResponse })
      }
      )
      .catch(error => alert(error.message));
  }

  async function createPurchase(purchase: IPurchase) {
    axios.post("http://localhost:8080/purchases", purchase)
      .then(response => {
        let serverResponse = response.data
        setPurchaseId(serverResponse.id);
        dispatch({ type: ActionType.getPurchaseId, payload: serverResponse.id })
      }
      )
      .catch(error => alert(error.message));
  }


  const [purchase, setPurchase] = useState<IPurchase>({
    totalPrice: 0,
    customerId: JSON.parse(localStorage.getItem("userId")),
    coupons: []
  })



  function getCouponsFromCart() {
    const couponsId = cartItems.map(item => item.id)
    const couponsAmount = cartItems.map(item => item.amount)
    let arrayOfCouponsId = couponsId.flatMap((x, i) => Array(couponsAmount[i]).fill(x));
    let couponsToPurchase: ICoupon[] = []
    arrayOfCouponsId.forEach(id => {
      let coupon: ICoupon = coupons.find(coupon => coupon.id === id)
      couponsToPurchase.push(coupon)
    })
    const totalPrice = cartItems.reduce((total, cartItem) => {
      const item = coupons.find((item: ICoupon) => item.id === cartItem.id)
      return total + (item?.price || 0) * cartItem.amount
    }, 0)
    setPurchase({ ...purchase, coupons: [...couponsToPurchase], totalPrice })
  }

  let handlePlaceOrderClick = () => {

    setIsLoading(true)
    createPurchase(purchase)
    localStorage.removeItem("shopping-cart")

    setTimeout(() => {
      navigate("/receipt")

    }, 3000)
  }

  useEffect(() => {
    getCoupons()

  }, [])

  useEffect(() => {
    getCouponsFromCart()
  }, [coupons])


  return (
    <div className='checkout-container'>


      <div className='checkout-content'>

        {cartItems.length > 0 ?

          cartItems.map((item: CartItems) => {
            return <CartItem key={item.id} id={item.id} amount={item.amount} />
          })

          :
          <h1 className='nothing-to-show-message'>Nothing To Show Here</h1>
        }
      </div>
      <div className='total-section'>
        Total: ${cartItems.reduce((total: number, cartItem: CartItems) => {
          const item = coupons.find((item: ICoupon) => item.id === cartItem.id)
          return total + (item?.price || 0) * cartItem.amount
        }, 0)}
        <div className='place-order-area'>
          <div className='loading_spinner_on_checkout'>
            {isLoading && <LoadingSpinner />}
          </div>
          <Button onClick={handlePlaceOrderClick}>Place Order</Button>
        </div>

      </div>
    </div>
  )
}

export default Checkout

