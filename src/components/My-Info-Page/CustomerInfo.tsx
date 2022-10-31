import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaUserCircle, FaHistory } from 'react-icons/fa'
import { Button, Form } from 'react-bootstrap';
import { ICustomer } from '../../Model/ICustomer';
import { useNavigate } from 'react-router-dom';

function CustomerInfo() {

    let navigate = useNavigate()

    const [editMyInfoMode, setEditMyInfoMode] = useState<boolean>(false)

    let customerId = JSON.parse(localStorage.getItem('userId'))


    async function getCustomer(id: number) {
        axios.get(`http://localhost:8080/customers/${id}`)
            .then(response => {
                let customer = response.data
                let [year, month, day] = customer.birthday
                if (month.toString().length == 1) {
                    month = '0' + month
                }
                if (day.toString().length == 1) {
                    day = '0' + day
                }
                setCustomer({ ...customer, ['birthday']: [year, month, day] })
            }
            )
            .catch(error => alert(error.message));
    }



    async function updateCustomer(id: number, customer: { [key: string]: string | number | any | ICustomer }) {
        axios.put(`http://localhost:8080/customers/${id}`, customer,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                let customer = response.data
                let [year, month, day] = customer.birthday
                if (month.toString().length == 1) {
                    month = '0' + month
                }
                if (day.toString().length == 1) {
                    day = '0' + day
                }
                setCustomer({ ...customer, ['birthday']: [year, month, day] })
            }
            )
            .catch(error => alert(error.message));
    }


    const [customer, setCustomer] = useState<{ [key: string]: string | number | any | ICustomer }>({})


    const [firstnameError, setFirstnameError] = useState("")
    const [lastnameError, setLastnameError] = useState("")
    const [addressError, setAddressError] = useState("")
    const [phoneNumberError, setPhoneNumberError] = useState("")
    const [amountOfChildernError, setAmountOfChildrenError] = useState("")
    const [birthdayError, setBirthdayError] = useState("")



    let onChangeCustomer = (e: any) => {
        if (e.target.name === "firstname") {
            setFirstnameError("")
        }
        if (e.target.name === "lastname") {
            setLastnameError("")
        }
        if (e.target.name === "address") {
            setAddressError("")
        }
        if (e.target.name === "phoneNumber") {
            setPhoneNumberError("")
        }
        if (e.target.name === "amountOfChildren") {
            setAmountOfChildrenError("")
        }
        if (e.target.name === "birthday") {
            setBirthdayError("")
        }
        setCustomer({
            ...customer,
            [e.target.name]: e.target.value,
            user: {
                ...customer.user,
                [e.target.name]: e.target.value,
            },
        })
    }

    let handleSubmitChanges = () => {
        let isValid = true;

        if (!customer.address) {
            setAddressError("Adress is required")
            isValid = false
        }
        if (!customer.phoneNumber) {
            setPhoneNumberError("Phone number is required")
            isValid = false
        }
        if (!customer.birthday) {
            setBirthdayError("Birth Date is required")
            isValid = false
        }
        if (customer.birthday <= new Date()) {
            setBirthdayError("Birth Date is invalid")
            isValid = false
        }

        if (!customer.user.firstname) {
            setFirstnameError("First name is requird")
            isValid = false
        }
        if (!customer.user.lastname) {
            setLastnameError("Last name is required")
            isValid = false
        }

        if (isValid) {
            updateCustomer(customerId, customer)
            setEditMyInfoMode(false)
        }
    }

    let handleCancelEditClick = () => {
        setEditMyInfoMode(false)
    }

    let handleOnEditClick = () => {
        setEditMyInfoMode(true)
    }

    let handleMyPurchasesHistoryClick = () => {
        navigate("/purchaseshistory")
    }


    useEffect(() => {
        getCustomer(customerId)

    }, [])

    return (
        <div>
            {editMyInfoMode ?
                <>
                    <Form>
                        <Form.Group>

                            <Form.Label>First Name</Form.Label>
                            <Form.Control name='firstname' defaultValue={customer.user.firstname} onChange={onChangeCustomer} />
                            <p className="error-update">{firstnameError}</p>

                            <Form.Label>Last Name</Form.Label>
                            <Form.Control name='lastname' defaultValue={customer.user.lastname} onChange={onChangeCustomer} />
                            <p className="error-update">{lastnameError}</p>

                            <Form.Label>Address</Form.Label>
                            <Form.Control name='address' defaultValue={customer.address} onChange={onChangeCustomer} />
                            <p className="error-update">{addressError}</p>

                            <Form.Label>Amount Of Kids</Form.Label>
                            <Form.Control name='amountOfChildren' type='number' defaultValue={customer.amountOfChildren} onChange={onChangeCustomer} />
                            <p className="error-update">{amountOfChildernError}</p>

                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control name='phoneNumber' defaultValue={customer.phoneNumber} onChange={onChangeCustomer} />
                            <p className="error-update">{phoneNumberError}</p>

                            <Form.Label>Birth Date</Form.Label>
                            <Form.Control name="birthday" type='date' defaultValue={`${customer.birthday[0]}-${customer.birthday[1]}-${customer.birthday[2]}`} onChange={onChangeCustomer} />
                            <p className="error-update">{birthdayError}</p>

                        </Form.Group>
                    </Form>
                    <div className="my-info-buttons-container">
                        <Button className='submit-changes-info bg-success' style={{ border: 'none', height: '30px' }} onClick={handleSubmitChanges}>Submit Changes</Button>
                        <Button className='cancel-changes-info bg-danger' style={{ border: 'none', height: '30px' }} onClick={handleCancelEditClick}>Cancel Changes</Button>
                    </div>
                </>
                :

                <div className='card-company-info'>
                    <div className='card-company-content'>
                        {customer.user &&
                            <div>
                                Email: {customer.user.username}
                                <br />
                                First Name: {customer.user.firstname}
                                <br />
                                Last Name: {customer.user.lastname}
                                <br />
                                Address: {customer.address}
                                <br />
                                Amount Of Kids: {customer.amountOfChildren}
                                <br />
                                Birth Date: {`${customer.birthday[2]}-${customer.birthday[1]}-${customer.birthday[0]}`}
                                <br />
                                Phone Number: {customer.phoneNumber}
                            </div>
                        }
                    </div>
                    <div className="my-info-buttons-container">
                        <Button className='cancel-changes-info bg-warning' style={{ border: 'none', height: '30px', width: "157px" }} onClick={handleOnEditClick}>Edit My Info <FaUserCircle /></Button>
                        <Button className='cancel-changes-info bg-info' style={{ border: 'none', height: '30px' }} onClick={handleMyPurchasesHistoryClick}>My Purchases History <FaHistory /></Button>
                    </div>
                </div>
            }
        </div>
    )
}

export default CustomerInfo