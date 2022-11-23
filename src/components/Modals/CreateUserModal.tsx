import axios from 'axios'
import React, { ChangeEvent, MouseEventHandler, SyntheticEvent, useState } from 'react'
import { Button, Dropdown } from 'react-bootstrap'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ICompany } from '../../Model/ICompany'
import { IUser } from '../../Model/IUser'
import { ActionType } from '../../Redux/action-type'
import './CreateUserModal.css'

function CreateUserModal() {
    let dispatch = useDispatch()
    let navigate = useNavigate()

    const [roleSelected, setRoleSelected] = useState<string>("")


    async function createUser(user: IUser) {
        axios.post('http://localhost:8080/users', user,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                let serverResponse = response.data
                navigate(`/user/${serverResponse.id}`)
            }).catch(error => error.message)
    }

    async function isExistByUsername(username: string) {
        const response = await axios.get(`http://localhost:8080/users/isExistByUsername?username=${username}`)
        return response.data
    }


    const [newUser, setNewUser] = useState<IUser>({
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        companyId: null,
        role: roleSelected
    })

    const [firstnameError, setFirstnameError] = useState<string>("")
    const [lastnameError, setLastnameError] = useState<string>("")
    const [emailError, setEmailError] = useState<string>("")
    const [passwordError, setPasswordError] = useState<string>("")
    const [roleError, setRoleError] = useState<string>("")
    const [companyIdError, setCompanyIdError] = useState<string>("")


    let onChange = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.name === "firstname") {
            setFirstnameError("")
        }
        if (e.target.name === "lastname") {
            setLastnameError("")
        }
        if (e.target.name === "username") {
            setEmailError("")
        }
        if (e.target.name === "password") {
            setPasswordError("")
        }
        if (e.target.name === "password") {
            setPasswordError("")
        }
        if (e.target.name === "comapnyId") {
            setCompanyIdError("")
        }
        if (roleSelected !== "") {
            setRoleError("")
        }

        setNewUser({ ...newUser, [e.target.name]: e.target.value })
    }


    let handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        newUser.role = roleSelected
        console.log(newUser);

        let isValid: boolean = true;

        let isUsernameExist = await isExistByUsername(newUser.username)

        if (!newUser.firstname) {
            setFirstnameError("First name is required")
            isValid = false
        }
        if (!newUser.lastname) {
            setLastnameError("Last Name is required")
            isValid = false
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(newUser.username)) {
            setEmailError("Email address is invalid")
            isValid = false
        }
        if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}/i.test(newUser.password)) {
            setPasswordError("Password must include at least 8 chars, not more than 12 chars, one uppercase and one lower case")
            isValid = false
        }
        if (!newUser.role) {
            setRoleError("Role is required")
            isValid = false
        }
        if (roleSelected === "Company" && !newUser.companyId) {
            setCompanyIdError("CompanyID is required with type 'Company'")
            isValid = false
        }
        if (isUsernameExist) {
            setEmailError("The email you have entered already exist")
            isValid = false
        }

        if (isValid) {
            createUser(newUser)
            dispatch({ type: ActionType.openUserModal, payload: false })
        }

    }



    let handleCloseModal = () => {
        dispatch({ type: ActionType.openUserModal, payload: false })
    }
    return (
        <div className="create-user-modal-background">
            <div className='create-user-modal-conatainer'>
                <div className='close-modal-button'>
                    <Button style={{ background: "none", border: "none", boxShadow: "none" }} onClick={handleCloseModal}><AiOutlineCloseCircle style={{ fontSize: "20px" }} /></Button>
                </div>
                <div className='form-create-user-container'>
                    <h3 className='create-user-modal-title'>New user Details:</h3>
                    <form className='form-create-user' onSubmit={handleSubmit}>
                        <div className='details-of-user'>
                            <label htmlFor="firstname">First Name*</label>
                            <input defaultValue={newUser.firstname} id='1' name='firstname' type="text" placeholder='First Name' onChange={onChange} />
                            <p className='error'>{firstnameError}</p>
                        </div>

                        <div className='details-of-user'>
                            <label htmlFor="lastname">Last Name*</label>
                            <input defaultValue={newUser.lastname} id='2' name='lastname' type="text" placeholder='Last Name' onChange={onChange} />
                            <p className='error'>{lastnameError}</p>
                        </div>

                        <div className='details-of-user'>
                            <label htmlFor="email">Email*</label>
                            <input defaultValue={newUser.username} id='3' name='username' type="email" placeholder='Email' onChange={onChange} />
                            <p className='error'>{emailError}</p>
                        </div>

                        <div className='details-of-user'>
                            <label htmlFor="password">Password*</label>
                            <input defaultValue={newUser.password} id='4' name='password' type="password" placeholder='Password' onChange={onChange} />
                            <p className='error'>{passwordError}</p>
                        </div>
                        <div className='dropdown-roles'>
                            <label htmlFor="role">Role*</label>
                            <div className='dropdown-container'>
                                <Dropdown >
                                    <Dropdown.Toggle className='roles-dropdown-button bg-secondary' style={{ border: "none" }}>
                                        {roleSelected ? `${roleSelected}` : "Role"}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu style={{ width: "200px", fontSize: "20px" }}>
                                        <Dropdown.Item onClick={() => setRoleSelected("Admin")}>Admin</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setRoleSelected("Customer")}>Customer</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setRoleSelected("Company")}>Company</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                            <p className='error'>{roleError}</p>
                        </div>
                        {roleSelected === "Company" &&
                            <div className='details-of-user'>
                                <label htmlFor="password">CompanyID*</label>
                                <input defaultValue={newUser.companyId} id='6' name='comapnyId' type="text" placeholder='CompanyID' onChange={onChange} />
                                <p className='error'>{companyIdError}</p>
                            </div>
                        }
                        <div className='button-submit-user'>
                            <Button className='sumbit-button-user bg-success' style={{ border: "none", fontSize: "20px", width: "150px" }} type="submit">Create</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default CreateUserModal