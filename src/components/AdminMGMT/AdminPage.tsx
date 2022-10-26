import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ICompany } from '../../Model/ICompany'
import { ActionType } from '../../Redux/action-type'
import { AppState } from '../../Redux/app-state'
import './AdminPage.css'

function AdminPage() {
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let companiesByPage = useSelector((state: AppState) => state.companiesByPage);
    let companies = useSelector((state: AppState) => state.companies);

    const [pageNumber, setPageNumber] = useState<number>(0)

    const companiesPerPage = 6

    let pageCount = Math.ceil(companies.length / companiesPerPage)


    async function getCompanies() {
        axios.get("http://localhost:8080/companies")
            .then(response => {
                let serverResponse = response.data
                dispatch({ type: ActionType.getAllCompanies, payload: serverResponse })
            }).catch(error => alert(error.message))
    }



    async function setItemsPerPage(pageNumber: number, companiesPerPage: number) {
        axios.get(`http://localhost:8080/companies/pages/${pageNumber}/${companiesPerPage}`)
            .then(response => {
                let serverResponse = response.data                
                dispatch({ type: ActionType.getCompaniesByPage, payload: serverResponse })
            }
            )
            .catch(error => alert(error.message));
    }


    let changePage = ({ selected }: any) => {
        setPageNumber(selected)
    }

    useEffect(() => {
        getCompanies();
        setItemsPerPage(pageNumber, companiesPerPage)
    }, [pageNumber])




    return (
        <div className='mgmt-container'>
            
            <div className='companies-area'>

                {companiesByPage.map((company: ICompany) => {

                    return <Card className='comapny-card'>
                        <Card.Body>
                            <Card.Header className='company-card-header'>
                              {company.companyName}
                            </Card.Header>
                            <Card.Title className='company-card-title'>
                                Details
                            </Card.Title>

                            <Card.Text className='comapny-card-text'>
                                Address: {company.address}
                            </Card.Text>
                            <Card.Text className='comapny-card-text'>
                                Phone Number: {company.phoneNumber}
                            </Card.Text>

                            <Card.Footer className='company-card-footer'>
                                <Button>Edit</Button>
                                <Button>Delete</Button>
                                <Button>View company's coupons</Button>
                            </Card.Footer>
                        </Card.Body>
                    </Card>
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

export default AdminPage