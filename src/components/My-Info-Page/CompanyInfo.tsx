import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { Button, Card, Form } from 'react-bootstrap'
import { ICompany } from '../../Model/ICompany'

function CompanyInfo() {

    const [editMyInfoMode, setEditMyInfoMode] = useState<boolean>(false)

    let companyId = JSON.parse(localStorage.getItem('companyId'))

    const [company, setCompany] = useState<{ [key: string]: string | number | any | ICompany }>({})

    const [newCompany, setNewCompany] = useState<{ [key: string]: string | number | any | ICompany }>({
        companyName: "",
        phoneNumber: "",
        address: ""
    })

    const [comapnyNameError, setCompanynameError] = useState("")
    const [addressError, setAddressError] = useState("")
    const [phoneNumberError, setPhoneNumberError] = useState("")


    async function updateCompany(id: number, company: { [key: string]: string | number | any | ICompany }) {
        axios.put(`http://localhost:8080/companies/${id}`, company,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                let serverResponse = response.data
            }
            )
            .catch(error => alert(error.message));
    }


    let onChange = (e: any) => {
        if (e.target.name === "companyName") {
            setCompanynameError("")
        }
        if (e.target.name === "address") {
            setAddressError("")
        }
        if (e.target.name === "phoneNumber") {
            setPhoneNumberError("")
        }

        setCompany({ ...company, [e.target.name]: e.target.value })
    }

    let handleCompanySubmit = () => {

        let isValid = true;

        if (!company.companyName) {
            setCompanynameError("Company name is required")
            isValid = false
        }
        if (!company.address) {
            setAddressError("Address is required")
            isValid = false
        }
        if (!company.phoneNumber) {
            setPhoneNumberError("Phone Number is required")
            isValid = false
        }

        if (isValid) {
            updateCompany(companyId, company)
            setEditMyInfoMode(false)
        }
    }

    let handleCancelEditClick = () => {
        setEditMyInfoMode(false)
    }

    let handleOnEditClick = () => {
        setEditMyInfoMode(true)
    }


    useEffect(() => {
        fetch(`http://localhost:8080/companies/${companyId}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            }).then(data => data.json()).then(setCompany);
    }, [])




    return (
        <div>

            {editMyInfoMode ?
                <Form>
                    <Form.Group>
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control name='companyName' onChange={onChange} defaultValue={company.companyName} />
                        <p className='my-info-error'>{comapnyNameError}</p>
                        <Form.Label>Address</Form.Label>
                        <Form.Control name='address' onChange={onChange} defaultValue={company.address} />
                        <p className='my-info-error'>{addressError}</p>
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control name='phoneNumber' onChange={onChange} defaultValue={company.phoneNumber} />
                        <p className='my-info-error'>{phoneNumberError}</p>
                        <div className="my-info-buttons-container">
                            <Button className='submit-changes-info bg-success' style={{ border: 'none', height: '30px' }} onClick={handleCompanySubmit}>Submit Changes</Button>
                            <Button className='cancel-changes-info bg-danger' style={{ border: 'none', height: '30px' }} onClick={handleCancelEditClick}>Cancel Changes</Button>
                        </div>
                    </Form.Group>
                </Form>

                :
                <div className='card-company-info'>
                    <div className='card-company-content'>
                        Company Name: {company.companyName}
                        <br />
                        Address: {company.address}
                        <br />
                        Phone Number: {company.phoneNumber}
                    </div>
                    <div className="my-info-buttons-container">
                        <Button className='cancel-changes-info bg-warning' style={{ border: 'none', height: '30px' }} onClick={handleOnEditClick}>Edit My Info <FaUserCircle /></Button>
                    </div>
                </div>
            }
        </div >
    )
}

export default CompanyInfo