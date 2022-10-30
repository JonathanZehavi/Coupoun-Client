import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
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
        await axios.get("http://localhost:8080/companies", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }
        ).then(response => {
            let serverResponse = response.data
            dispatch({ type: ActionType.getAllCompanies, payload: serverResponse })
        }).catch(error => alert(error.message))
    }


    async function getCompanyById(id: number) {
        axios.get(`http://localhost:8080/companies/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                let serverResponse = response.data
                dispatch({ type: ActionType.getCompanyById, payload: serverResponse })
            }).catch(error => alert(error.message))
    }



    async function setItemsPerPage(pageNumber: number, companiesPerPage: number) {
        axios.get(`http://localhost:8080/companies/pages/${pageNumber}/${companiesPerPage}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                let serverResponse = response.data
                dispatch({ type: ActionType.getCompaniesByPage, payload: serverResponse })
            }
            )
            .catch(error => alert(error.message));
    }

    let handleCompanySelected = (id: number) => {
        getCompanyById(id)
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

                    return <Card key={company.id} className='comapny-card'>
                        <Card.Body>
                            <Card.Header className='company-card-header'>
                                {company.companyName}, ID: {company.id}
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
                                <Link className='link_to_coupon' to={`/company/${company.id}`} onClick={() => handleCompanySelected(company.id)}>
                                    <Button value={company.id}>View company's page</Button>
                                </Link>
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