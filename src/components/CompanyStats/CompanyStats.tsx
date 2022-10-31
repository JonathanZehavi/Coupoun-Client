import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ICoupon } from '../../Model/ICoupon'
import { ActionType } from '../../Redux/action-type'
import { AppState } from '../../Redux/app-state'
import './CompanyStats.css'

function CompanyStats() {
    let dispatch = useDispatch();

    let coupons = useSelector((state: AppState) => state.couponsByCompanyId);

    const [amountOfTimePurchased, setAmountOfTimePurchased] = useState<number>(0)
    const [isShownId, setIsShownId] = useState(null)

    let companyId = JSON.parse(localStorage.getItem("companyId"));

    const getAmountOfTimesPurchased = async (couponId: number) => {
        let response = await axios.get(`http://localhost:8080/purchases/ByCouponId/${couponId}`)
        let data = response.data
        setAmountOfTimePurchased(data)
        return data;
    }

    let handleClick = (id: number) => {
        getAmountOfTimesPurchased(id)
        setIsShownId(id)
    }



    async function getCouponsByComnpanyId(id: number) {
        axios.get(`http://localhost:8080/coupons/byCompanyId/${id}`)
            .then(response => {
                let serverResponse = response.data
                dispatch({ type: ActionType.getCouponsByCompanyId, payload: serverResponse })
            }).catch(error => alert(error.message))
    }

    useEffect(() => {
        getCouponsByComnpanyId(companyId)
    }, [])

    return (
        <div className='company-stats-container'>
            <div className='coupons-company-stats-area'>
                <>
                    {coupons.map((coupon: ICoupon) => {
                        return <Card className='coupon-card-company-stats' key={coupon.id}>
                            <Card.Body>
                                <Card.Header className='coupon-card-company-stats-header'>
                                    <Link to={`/coupon/${coupon.id}`}><img src={coupon.image} alt="coupon-image" /></Link>
                                </Card.Header>
                                <Card.Text className='coupon-card-company-stats-body'>
                                    <Card.Title>
                                        {coupon.title}
                                    </Card.Title>
                                    <span style={{ fontWeight: "bold" }}>Price:</span> ${coupon.price}
                                    <br />
                                    <span style={{ fontWeight: "bold" }}>Amount Left:</span> {coupon.amount}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className='footer-card-company-stats-container'>
                                <Button value={coupon.id} key={coupon.id} onClick={() => {
                                    handleClick(coupon.id)
                                }}>Purchased For:</Button><span className='amount-of-times-purchased'>{isShownId === coupon.id ? amountOfTimePurchased : ""}</span>
                            </Card.Footer>
                        </Card>
                    })}
                </>
            </div>

        </div >
    )
}

export default CompanyStats