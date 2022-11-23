import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { ICompany } from '../../../Model/ICompany'
import { ActionType } from '../../../Redux/action-type'
import { AppState } from '../../../Redux/app-state'
import { IoIosAddCircleOutline } from 'react-icons/io'
import './CompaniesMGMT.css'

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
        }).catch(error => {
            if (error.message.includes("403")) {
                navigate("/unauthorized")
            }
        });
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
            .catch(error => {
                if (error.message.includes("403")) {
                    navigate("/unauthorized")
                }
            });
    }


    let changePage = ({ selected }: { selected: number }): void => {
        setPageNumber(selected)
    }

    let handleCreateCompanyClick = () => {
        dispatch({ type: ActionType.openCompanyModal, payload: true })
    }

    useEffect(() => {
        getCompanies();
        setItemsPerPage(pageNumber, companiesPerPage)
    }, [pageNumber])




    return (
        <div>

            <div className='mgmt-container'>
                <div className='create-new-company-button-container'>
                    <Button className='create-new-company-button bg-success'
                        style={{
                            border: "none",
                            width: "250px",
                            height: "45px",
                            fontSize: "20px"
                        }} onClick={handleCreateCompanyClick}>Create new Compnay <IoIosAddCircleOutline style={{ fontSize: "25px" }} /></Button>
                </div>

                <div className='companies-area'>

                    {companiesByPage.map((company: ICompany) => {

                        return <Card key={company.id} className='comapny-card'>
                            <Card.Body>
                                <Card.Header className='company-card-header'>
                                    {company.companyName}, ID: {company.id}
                                </Card.Header>
                                <Card.Title className='company-card-title'>
                                    Details:
                                </Card.Title>

                                <Card.Text className='comapny-card-text'>
                                    Address: {company.address}
                                </Card.Text>
                                <Card.Text className='comapny-card-text'>
                                    Phone Number: {company.phoneNumber}
                                </Card.Text>

                                <Card.Footer className='company-card-footer'>
                                    <Link className='link_to_coupon' to={`/company/${company.id}`}>
                                        <Button variant='secondary' value={company.id}>View company's page</Button>
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
        </div>
    )
}

export default AdminPage