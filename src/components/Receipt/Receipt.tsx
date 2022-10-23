import axios from 'axios';
import { useEffect, useState } from 'react'
import { Stack } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { ICoupon } from '../../Model/ICoupon';
import { AppState } from '../../Redux/app-state';
import { useCart } from '../Context/Cart-Context';
import './Receipt.css'

function Receipt() {

    let id = useSelector((state: AppState) => state.purchaseId)

    console.log(id);

    const {setCartItems} = useCart()
    
  
    const [purchaseDetails, setPurchaseDetails] = useState({
        firstname: "",
        lastname: "",
        username: "",
        address: "",
        phoneNumber: "",
        amount: 0,
        dateOfPurchase: "",
        coupons: []
    })



    async function getPurchaseDetails(id: number) {
        axios.get(`http://localhost:8080/purchases/getPurchaseDetails/${id}`)
            .then(response => {
                let serverResponse = response.data
                setPurchaseDetails({ ...serverResponse, coupons: serverResponse.coupons })
            }
            )
            .catch(error => alert(error.message));
    }


    useEffect(() => {
        getPurchaseDetails(id)
        setCartItems([])
    }, [])

    return (
        <div className='purchase-details-fullpage'>
            <div className='purchase-details'>
                <h3 className='title-purchase-details'>Your Order Details:</h3>


                <h5>First Name: {purchaseDetails.firstname}</h5>
                <h5>Last Name: {purchaseDetails.lastname}</h5>
                <h5>E-Mail: {purchaseDetails.username}</h5>
                <h5>Address: {purchaseDetails.address}</h5>
                <h5>Amount In Total: {purchaseDetails.amount}</h5>
                <h5>Phone Number: {purchaseDetails.phoneNumber}</h5>
                <h5>Purchased On: {purchaseDetails.dateOfPurchase}</h5>

                <div className='coupons-of-purchase-details'>
                    {purchaseDetails.coupons.map((coupon: ICoupon) => {
                        return <>

                            <Stack direction="horizontal" gap={2}>
                                <img src={coupon.image} alt='coupon-card-img' style={{
                                    width: "125px",
                                    height: "125px",
                                    objectFit: "cover"
                                }} />

                                <div className="me-auto">
                                    <div>
                                        {coupon.title}{" "}
                                    </div>
                                    <div className="text-muted" style={{ fontSize: ".75rem" }}>
                                        ${coupon.price}
                                    </div>
                                </div>
                            </Stack>
                        </>

                    })}
                </div>
            </div>
        </div>
    )
}

export default Receipt