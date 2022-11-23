import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Card } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { ICoupon } from '../../../Model/ICoupon';
import { IPurchaseDetails } from '../../../Model/IPurchaseDetails';
import './Statistics.css'

function Statistics() {

    let navigate = useNavigate()

    const [purchases, setPurchases] = useState<IPurchaseDetails[]>([])
    const [allPurchases, setAllPurchases] = useState<IPurchaseDetails[]>([])

    const [pageNumber, setPageNumber] = useState<number>(0)

    const purchasesPerPage = 6

    let pageCount = Math.ceil(allPurchases.length / purchasesPerPage)


    let changePage = ({ selected }: { selected: number }): void => {
        setPageNumber(selected)
    }

    async function getAllPurchasesDetails() {
        axios.get(`http://localhost:8080/purchases/getAllPurchasesDetails`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                let serverResponse = response.data
                setAllPurchases(serverResponse)
            }
            )
            .catch(error => {
                if (error.message.includes("403")) {
                    navigate("/unauthorized")
                }
            });
    }


    async function getPurchasesDetails(pageNumber: number, purchasesPerPage: number) {
        axios.get(`http://localhost:8080/purchases/pagesOfPurchaseDetails/${pageNumber}/${purchasesPerPage}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                let serverResponse = response.data
                setPurchases(serverResponse)
            }
            )
            .catch(error => {
                if (error.message.includes("403")) {
                    navigate("/unauthorized")
                }
            });
    }

    useEffect(() => {
        getAllPurchasesDetails()
        getPurchasesDetails(pageNumber, purchasesPerPage)
    }, [pageNumber])



    return (
        <div className='stats-container'>
            <div style={{ fontSize: "25px", fontWeight: "bold" }}>{`Total of ${allPurchases.length} purchases`}</div>
            <div className='stats-area'>
                {purchases.map((purchase: IPurchaseDetails) => {
                    const date = new Date(
                        purchase.dateOfPurchase[0],
                        purchase.dateOfPurchase[1] - 1,
                        purchase.dateOfPurchase[2],
                        purchase.dateOfPurchase[3],
                        purchase.dateOfPurchase[4],
                        purchase.dateOfPurchase[5]
                    )
                    return <div key={purchase.id}>
                        <Card className='stats-card'>
                            <Card.Body >
                                <Card.Header className='card-header-stats-card'>Customer Name: {purchase.lastname}, {purchase.firstname}</Card.Header>
                                <Card.Text className='card-text-stats-card'>
                                    <Card.Title>
                                        Amount Of Coupons: {purchase.amount}
                                    </Card.Title>
                                    {purchase.username}
                                    <br />
                                    {purchase.address}
                                    <br />
                                    {purchase.phoneNumber}
                                    <br />
                                    {purchase.coupons.map(coupon => coupon.price + purchase.amount)}
                                </Card.Text>
                                <Card.Footer>
                                    Issued On: {date.toLocaleString('UK')}
                                </Card.Footer>
                            </Card.Body>
                        </Card>
                    </div>
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
        </div >
    )
}

export default Statistics