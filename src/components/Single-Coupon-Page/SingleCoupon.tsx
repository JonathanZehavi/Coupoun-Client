import axios from 'axios';
import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { MdDeleteForever, MdEditNote } from 'react-icons/md';
import { TbShoppingCartPlus } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ICoupon } from '../../Model/ICoupon';
import { ActionType } from '../../Redux/action-type';
import { useCart } from '../Context/Cart-Context';
import './SingleCoupon.css'


function SingleCoupon() {

  let dispatch = useDispatch();

  let navigate = useNavigate()

  const { getAmountOfItems, increaseCartAmount, decreaseCartAmount, removeFromCart }: any = useCart()

  async function deleteCoupon(id: number) {
    axios.delete(`http://localhost:8080/coupons/${id}`)
      .then(response => {
        dispatch({ type: ActionType.getAllCoupons, payload: id })
        localStorage.removeItem("EditMode")
      }
    )
      .catch(error => alert(error.message));
  }

  const [coupon, setCoupon] = useState<{ [key: string]: string | number | any | ICoupon }>({})


  const amountOfItems = getAmountOfItems(coupon.id)

  const { id } = useParams();

  function dateBuilder(dateArray: Array<number>) {
    let result = ''
    for (const item of dateArray) {
      if (item.toString().length === 1) {
        result += 0
      }
      result += item + '-'
    }
    result = result.slice(0, -1)
    return result
  }

  async function updateCoupon(id: number, coupon: any) {
    axios.put(`http://localhost:8080/coupons/${id}`, coupon)
      .then(response => {
        return response.data
      })

  }

  const [titleError, setTitleError] = useState<string>("")
  const [descriptionError, setDescriptionError] = useState<string>("")
  const [startDateError, setStartDateError] = useState<string>("")
  const [endDateError, setEndDateError] = useState<string>("")
  const [categoryError, setCategoryError] = useState<string>("")
  const [amountError, setAmountError] = useState<string>("")
  const [priceError, setPriceError] = useState<string>("")
  const [imageError, setImageError] = useState<string>("")




  let onChange = (e: any) => {
    if (e.target.name === "title") {
      setTitleError("")
    }
    if (e.target.name === "description") {
      setDescriptionError("")
    }
    if (e.target.name === "startDate") {
      setStartDateError("")
    }
    if (e.target.name === "endDate") {
      setEndDateError("")
    }
    if (e.target.name === "category") {
      setCategoryError("")
    }
    if (e.target.name === "amount") {
      setAmountError("")
    }
    if (e.target.name === "price") {
      setPriceError("")
    }
    if (e.target.name === "image") {
      setImageError("")
    }

    setCoupon({ ...coupon, [e.target.name]: e.target.value })

  }

  let handleSubmitChangesClick = (e: any) => {
    e.preventDefault()

    let isValid: boolean = true;

    if (!coupon.title) {
      setTitleError("Title is required")
      isValid = false
    }

    if (!coupon.description) {
      setDescriptionError("Description is required")
      isValid = false
    }

    if (!coupon.startDate) {
      setStartDateError("Start date is required")
      isValid = false
    }

    if (!coupon.endDate) {
      setEndDateError("End date is required")
      isValid = false
    }

    if (!coupon.category) {
      setCategoryError("Category is required")
      isValid = false
    }

    if (!coupon.amount) {
      setAmountError("Amount is required")
      isValid = false
    }

    if (coupon.amount <= 0) {
      setAmountError("Amount of coupons must be above 0")
      isValid = false
    }

    if (!coupon.price) {
      setPriceError("Price is required")
      isValid = false
    }

    if (coupon.price <= 0) {
      setPriceError("Price must be above 0")
      isValid = false
    }

    if (!coupon.image) {
      setImageError("Image is required")
      isValid = false
    }

    if (isValid) {
      updateCoupon(coupon.id, coupon) 
      localStorage.removeItem("EditMode")  
      window.location.reload()        
    }
  }

  const [editMode, setEditMode] = useState<boolean>(false)
  const [editModeFromMainPage, setEditModeFromMainPage] = useState<string | undefined | void>(undefined)

  let handleCancelEditClick = () => {
    setEditMode(false)
    setEditModeFromMainPage(localStorage.removeItem("EditMode"))
  }

  useEffect(() => {
    setEditModeFromMainPage(localStorage.getItem("EditMode"))
    fetch(`http://localhost:8080/coupons/${id}`).then(data => data.json()).then(setCoupon);
  }, [])


  return (
    <div className='single-coupon-page-container'>
      {(editMode || editModeFromMainPage) ?
        <>
          <div className='single-coupon-card'>
            <div className='single-coupon-card-header'>
              <img className='image-on-single-coupon' src={coupon.image} alt='coupons-img-header' />
            </div>
            <div className="single-coupon-card-body on-edit-mode">
              <div>
                <label htmlFor="title">Title</label>
                <input name='title' type="text" defaultValue={coupon.title} onChange={onChange} />
                <p className='error'>{titleError}</p>
              </div>
              <div>
                <label htmlFor="description">Description</label>
                <input name='description' type="text" defaultValue={coupon.description} onChange={onChange} />
                <p className='error'>{descriptionError}</p>
              </div>
              <div>
                <label htmlFor="startDate">Start Date</label>
                <input name='startDate' type="date" defaultValue={coupon.startDate && dateBuilder(coupon.startDate)} min={new Date().toISOString().split('T')[0]} onChange={onChange} />
                <p className='error'>{startDateError}</p>
              </div>
              <div>
                <label htmlFor="endDate">End Date</label>
                <input name='endDate' type="date" defaultValue={coupon.endDate && dateBuilder(coupon.endDate)} min={new Date().toISOString().split('T')[0]} onChange={onChange} />
                <p className='error'>{endDateError}</p>
              </div>
              <div>
                <label htmlFor="price">Price</label>
                <input name='price' type="text" defaultValue={coupon.price} onChange={onChange} />
                <p className='error'>{priceError}</p>
              </div>
              <div>
                <label htmlFor="category">Category</label>
                <input name='category' type="text" defaultValue={coupon.category} onChange={onChange} />
                <p className='error'>{categoryError}</p>
              </div>
              <div>
                <label htmlFor="amount">Amount</label>
                <input name='amount' type="text" defaultValue={coupon.amount} onChange={onChange} />
                <p className='error'>{amountError}</p>
              </div>
              <div>
                <label htmlFor="image">Image URL</label>
                <input name='image' type="text" defaultValue={coupon.image} onChange={onChange} />
                <p className='error'>{imageError}</p>
              </div>
              <div className='submit-changes-container'>
                <Button className="sumbit-edit bg-success" style={{ border: 'none' }} onClick={handleSubmitChangesClick}>Submit Changes</Button>
                <Button className='cancel-changes-info bg-danger' style={{ border: 'none' }} onClick={handleCancelEditClick}>Cancel Changes</Button>
              </div>
            </div>
          </div>
        </>
        :
        coupon.id && <div key={coupon.id} className='single-coupon-card'>
          <div className='single-coupon-card-header'>
            <img className='image-on-single-coupon' src={coupon.image} alt='coupons-img-header' />
          </div>
          <div className="single-coupon-card-body">
            <h4 className='single-coupon-category single-coupon-category-teal'>{coupon.category}</h4>
            <p>{coupon.description}</p>
            <p>Start At: {coupon.startDate[2]}/{coupon.startDate[1]}/{coupon.startDate[0]}</p>
            <p>Offer Expiration Date: {coupon.endDate[2]}/{coupon.endDate[1]}/{coupon.endDate[0]}</p>
            <p>Price: ${coupon.price}</p>
            <div className='buttons-on-single-coupon'>
              {!localStorage.getItem('userRole') && (<Button onClick={() => navigate("/login")}>Log In to order</Button>)}
              {localStorage.getItem('userRole') === "Customer" &&
                <div>
                  {amountOfItems === 0 ? (
                    <Button onClick={() => increaseCartAmount(coupon.id)} className='add-to-cart bg-success'>+ Add To Cart <TbShoppingCartPlus />
                    </Button>
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
              {(localStorage.getItem('userRole') === "Admin" || localStorage.getItem('userRole') === "Company") &&
                <><Button className='delete_coupon_button_on_single_coupon bg-danger' style={{ fontSize: "10px", width: "100px", border: "none" }} onClick={() => deleteCoupon(coupon.id)}>Delete<MdDeleteForever /></Button>
                <Button className='edit_coupon_button_on_single_coupon bg-warning' style={{ fontSize: "10px", width: "100px", border: "none" }} onClick={() => setEditMode(true)} >Edit<MdEditNote /></Button></>}
            </div>
          </div>
        </div>}
    </div>
  )
}

export default SingleCoupon

