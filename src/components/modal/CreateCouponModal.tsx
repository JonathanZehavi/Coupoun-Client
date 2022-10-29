import axios from 'axios'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ActionType } from '../../Redux/action-type'
import 'animate.css'
import './CreateCouponModal.css'
import { ICoupon } from '../../Model/ICoupon'

function CreateCouponModal() {

    let dispatch = useDispatch()
    let navigate = useNavigate()


    async function createCoupon(coupon: ICoupon) {
        axios.post('http://localhost:8080/coupons', coupon,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                let serverResponse = response.data
                dispatch({ type: ActionType.openModal, payload: false })
                navigate(`/coupon/${serverResponse.id}`)
            })
    }
    async function isCompanyExist(id: number | string) {
        const response = await axios.get(`http://localhost:8080/companies/isCompanyExist/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
        return response.data
    }

    const [newCoupon, setNewCoupon] = useState<ICoupon>({
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        category: "",
        companyId: localStorage.getItem("companyId") ? JSON.parse(localStorage.getItem("companyId")) : 0,
        amount: 0,
        price: 0,
        image: ""
    })

    const [titleError, setTitleError] = useState<string>("")
    const [descriptionError, setDescriptionError] = useState<string>("")
    const [startDateError, setStartDateError] = useState<string>("")
    const [endDateError, setEndDateError] = useState<string>("")
    const [categoryError, setCategoryError] = useState<string>("")
    const [companyIdError, setCompanyIdError] = useState<string>("")
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
        if (e.target.name === "companyId") {
            setCompanyIdError("")
        }
        if (e.target.name === "price") {
            setPriceError("")
        }
        if (e.target.name === "image") {
            setImageError("")
        }

        setNewCoupon({ ...newCoupon, [e.target.name]: e.target.value })
    }

    let handleSubmit = async (e: any) => {
        e.preventDefault()

        let isValid: boolean = true;

        let isCompanyExistById = await isCompanyExist(newCoupon.companyId)

        if (!isCompanyExistById) {
            setCompanyIdError("Couldn't find this company ID")
            isValid = false
        }
        if (!newCoupon.title) {
            setTitleError("Title is required")
            isValid = false
        }
        if (!newCoupon.description) {
            setDescriptionError("Description is required")
            isValid = false
        }
        if (!newCoupon.startDate) {
            setStartDateError("Start date is required")
            isValid = false
        }
        if (newCoupon.endDate <= newCoupon.startDate) {
            setStartDateError("Start date need to be before end date... DUH")
            isValid = false
        }
        if (newCoupon.endDate === newCoupon.startDate) {
            setStartDateError("Let us at least one day to see it")
            isValid = false
        }

        if (!newCoupon.endDate) {
            setEndDateError("End date is required")
            isValid = false
        }

        if (!newCoupon.category) {
            setCategoryError("Category is required")
            isValid = false
        }
        if (!newCoupon.companyId) {
            setCompanyIdError("Company ID is required")
            isValid = false
        }
        if (!newCoupon.amount) {
            setAmountError("Amount is required")
            isValid = false
        }
        if (newCoupon.amount <= 0) {
            setAmountError("Amount of coupons must be above 0")
            isValid = false
        }
        if (!newCoupon.price) {
            setPriceError("Price is required")
            isValid = false
        }
        if (newCoupon.price <= 0) {
            setPriceError("Price must be above 0")
            isValid = false
        }
        if (!newCoupon.image) {
            setImageError("Image is required")
            isValid = false
        }
        if (isValid) {
            createCoupon(newCoupon)
            dispatch({ type: ActionType.openModal, payload: false })
        }

    }



    let handleCloseModal = () => {
        dispatch({ type: ActionType.openModal, payload: false })
    }

    return (
        <div className="create-coupon-modal-background">
            <div className='create-coupon-modal-conatainer'>
                <div className='close-modal-button'>
                    <button style={{ background: "none", border: "none", fontSize: "15px" }} onClick={handleCloseModal}>X</button>
                </div>
                <div className='form-create-coupon-container'>
                    <h3 className='create-coupon-modal-title'>Please enter details for the new coupon:</h3>
                    <form className='form-create-coupon' onSubmit={handleSubmit}>
                        <div className='details-of-coupons'>
                            <label htmlFor="">Title*</label>
                            <input name='title' type='text' onChange={onChange} placeholder="Title" />
                            <p className='error'>{titleError}</p>
                        </div>
                        <div className='details-of-coupons'>
                            <label htmlFor="">Description*</label>
                            <input name='description' type='text' onChange={onChange} placeholder="Description" />
                            <p className='error'>{descriptionError}</p>
                        </div>
                        <div className='details-of-coupons'>
                            <label htmlFor="">Start Date*</label>
                            <input name='startDate' type='date' min={new Date().toISOString().split('T')[0]} onChange={onChange} placeholder="Start Date" />
                            <p className='error'>{startDateError}</p>
                        </div>
                        <div className='details-of-coupons'>
                            <label htmlFor="">End Date*</label>
                            <input name='endDate' type='date' min={new Date().toISOString().split('T')[0]} onChange={onChange} placeholder="End Date" />
                            <p className='error'>{endDateError}</p>
                        </div>
                        <div className='details-of-coupons'>
                            <label htmlFor="">Price*</label>
                            <input name='price' type='number' onChange={onChange} placeholder="Price" />
                            <p className='error'>{priceError}</p>
                        </div>
                        <div className='details-of-coupons'>
                            <label htmlFor="">Category*</label>
                            <input name='category' type='text' onChange={onChange} placeholder="Category" />
                            <p className='error'>{categoryError}</p>
                        </div>
                        {localStorage.getItem("userRole") === "Company" ?
                            <div className='details-of-coupons'>
                                <label htmlFor="">Company ID*</label>
                                <input name='companyId' value={newCoupon.companyId} readOnly />
                                <p className='error'></p>
                            </div>
                            :
                            <div className='details-of-coupons'>
                                <label htmlFor="">Company ID*</label>
                                <input name='companyId' type='number' onChange={onChange} placeholder="Company ID" />
                                <p className='error'>{companyIdError}</p>
                            </div>

                        }
                        <div className='details-of-coupons'>
                            <label htmlFor="">Amount*</label>
                            <input name='amount' type='number' onChange={onChange} placeholder="Amount" />
                            <p className='error'>{amountError}</p>
                        </div>
                        <div className='details-of-coupons'>
                            <label htmlFor="">Image URL*</label>
                            <input name='image' type='text' onChange={onChange} placeholder="Image URL" />
                            <p className='error'>{imageError}</p>
                        </div>
                        <div className='button-submit-coupon'>
                            <Button type="submit">Submit</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateCouponModal