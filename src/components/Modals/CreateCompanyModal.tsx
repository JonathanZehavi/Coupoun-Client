import axios from 'axios'
import React, { ChangeEvent, useState } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ICompany } from '../../Model/ICompany'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { ActionType } from '../../Redux/action-type'
import './CreateCompanyModal.css'

function CreateCompanyModal() {

    let dispatch = useDispatch()
    let navigate = useNavigate()


    async function createCompany(company: ICompany) {
        axios.post('http://localhost:8080/companies', company,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                let serverResponse = response.data
                navigate(`/company/${serverResponse.id}`)
            }).catch(error => error.message)
    }

    async function isCompanyExist(companyName: string) {
        const response = await axios.get(`http://localhost:8080/companies/isCompanyNameExist?companyName=${companyName}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
        return response.data
    }
    async function isPhoneNumberExist(phoneNumber: string) {
        const response = await axios.get(`http://localhost:8080/companies/isPhoneNumberExist?phoneNumber=${phoneNumber}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
        return response.data
    }

    const [newCompany, setNewCompany] = useState<ICompany>({
        companyName: "",
        phoneNumber: "",
        address: ""
    })

    const [companyNameError, setCompanyNameError] = useState<string>("")
    const [phoneNumberError, setPhoneNumberError] = useState<string>("")
    const [addressError, setAddressError] = useState<string>("")


    let onChange = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.name === "companyName") {
            setCompanyNameError("")
        }
        if (e.target.name === "phoneNumber") {
            setPhoneNumberError("")
        }
        if (e.target.name === "address") {
            setAddressError("")
        }

        setNewCompany({ ...newCompany, [e.target.name]: e.target.value })
    }

    let handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        let isValid: boolean = true;

        let isCompanyExistByName = await isCompanyExist(newCompany.companyName)
        let isPhoneNumberAlreadyExist = await isPhoneNumberExist(newCompany.phoneNumber)

        if (isCompanyExistByName) {
            setCompanyNameError("Company is already exist")
            isValid = false
        }
        if (isPhoneNumberAlreadyExist) {
            setPhoneNumberError("This Phone Number already in use")
            isValid = false
        }
        if (!newCompany.companyName) {
            setCompanyNameError("Company Name is required")
            isValid = false
        }
        if (!newCompany.phoneNumber) {
            setPhoneNumberError("Phone number is required")
            isValid = false
        }
        if (!newCompany.address) {
            setAddressError("Address is required")
            isValid = false
        }

        if (isValid) {
            createCompany(newCompany)
            dispatch({ type: ActionType.openCompanyModal, payload: false })
        }

    }

    let handleCloseModal = () => {
        dispatch({ type: ActionType.openCompanyModal, payload: false })
    }
    return (
        <div className="create-company-modal-background">
            <div className='create-company-modal-conatainer'>
                <div className='close-modal-button'>
                    <Button style={{ background: "none", border: "none", boxShadow: "none" }} onClick={handleCloseModal}><AiOutlineCloseCircle style={{ fontSize: "20px" }} /></Button>
                </div>
                <div className='form-create-company-container'>
                    <h3 className='create-company-modal-title'>New Company Details:</h3>
                    <form className='form-create-company' onSubmit={handleSubmit}>
                        <div className='details-of-company'>
                            <label htmlFor="">Company Name*</label>
                            <input name='companyName' type='text' onChange={onChange} placeholder="Company Name" />
                            <p className='error'>{companyNameError}</p>
                        </div>
                        <div className='details-of-company'>
                            <label htmlFor="">Phone Number*</label>
                            <input name='phoneNumber' type='text' onChange={onChange} placeholder="Phone Number" />
                            <p className='error'>{phoneNumberError}</p>
                        </div>
                        <div className='details-of-company'>
                            <label htmlFor="">Address*</label>
                            <input name='address' type='text' onChange={onChange} placeholder="Address" />
                            <p className='error'>{addressError}</p>
                        </div>
                        <div className='button-submit-company'>
                            <Button className='sumbit-button-company bg-success' style={{ border: "none", fontSize: "20px", width: "150px" }} type="submit">Create</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateCompanyModal