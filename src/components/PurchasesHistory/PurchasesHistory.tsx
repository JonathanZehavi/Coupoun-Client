import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Stack } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { ICoupon } from '../../Model/ICoupon';
import { IPurchaseDetails } from '../../Model/IPurchaseDetails';
import { ActionType } from '../../Redux/action-type';
import { AppState } from '../../Redux/app-state';
import './PurchasesHistory.css'

function PurchasesHistoy() {

    let customerId = JSON.parse(localStorage.getItem("userId"));

    let dispatch = useDispatch()

    let purchasesDetails = useSelector((state: AppState) => state.purchasesDetails)
    let purchasesDetailsByPage = useSelector((state: AppState) => state.purchasesDetailsByPage)

    const [pageNumber, setPageNumber] = useState<number>(0)

    const purchasesPerPage = 3

    let pageCount = Math.ceil(purchasesDetails.length / purchasesPerPage)

    async function getPurchasesByCudtomerIdByPage(id: number, pageNumber: number, purchasesPerPage: number) {
        axios.get(`http://localhost:8080/purchases/pagesOfPurchaseDetails/ByCustomerId/${id}/${pageNumber}/${purchasesPerPage}`)
            .then(response => {
                let serverResponse = response.data
                dispatch({ type: ActionType.getAllPurchasesDetailsByPage, payload: serverResponse })
                console.log();

            }).catch(error => error.message)
    }
    async function getPurchasesByCudtomerId(id: number) {
        axios.get(`http://localhost:8080/purchases/ByCustomerId/${id}`)
            .then(response => {
                let serverResponse = response.data
                dispatch({ type: ActionType.getAllPurchasesDetails, payload: serverResponse })
                console.log();

            }).catch(error => error.message)
    }

    let changePage = ({ selected }: any) => {
        setPageNumber(selected)
    }



    useEffect(() => {
        getPurchasesByCudtomerIdByPage(customerId, pageNumber, purchasesPerPage)
        getPurchasesByCudtomerId(customerId)
    }, [pageNumber])




    return (
        <div className='purchase-history-full-page'>
            <div className='purchase-history-container'>
                {purchasesDetailsByPage.map((purchaseDetails: IPurchaseDetails) => {
                    return <>
                        <div className='purchase-history-card'>
                            <div className='header-history'>
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
                                            <Stack className='coupon-on-history' direction="horizontal" gap={2}>
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
                    </>
                })}
            </div>
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination_buttons"}
                pageLinkClassName={"pages_buttons"}
                pageClassName={"pages_buttons"}
                previousLinkClassName={"previous_button"}
                nextLinkClassName={"next_button"}
                disabledLinkClassName={"disabled_buttons"}
                activeLinkClassName={"active_buttons"}
            />
        </div>
    )
}

export default PurchasesHistoy