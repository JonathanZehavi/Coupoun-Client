import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { IUser } from '../../Model/IUser';

function AdminInfo() {

    let userId = JSON.parse(localStorage.getItem('userId'))

    async function getUser(id: number) {
        axios.get(`http://localhost:8080/users/${id}`)
            .then(response => {
                let serverResponse = response.data
                setUser(serverResponse)
            }
            )
            .catch(error => alert(error.message));
    }

    async function updateUser(id: number, user: { [key: string]: string | number | any | IUser }) {
        axios.put(`http://localhost:8080/users/${id}`, user)
            .then(response => {
                let serverResponse = response.data
            }
            )
            .catch(error => alert(error.message));
    }


    const [editMyInfoMode, setEditMyInfoMode] = useState<boolean>(false)

    const [user, setUser] = useState<{ [key: string]: string | number | any | IUser }>({})

    const [firstnameError, setFirstnameError] = useState("")
    const [lastnameError, setLastnameError] = useState("")


    let onChangeUser = (e: any) => {
        if (e.target.name === "firstname") {
            setFirstnameError("")
        }
        if (e.target.name === "lastname") {
            setLastnameError("")
        }
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    let handleSubmitChanges = () => {
        let isValid = true;


        if (!user.firstname) {
            setFirstnameError("First name is requird")
            isValid = false
        }
        if (!user.lastname) {
            setLastnameError("Last name is required")
            isValid = false
        }

        if (isValid) {
            updateUser(userId, user)
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
        getUser(userId)
    }, [])



    return (
        <div>
            {editMyInfoMode ?
                <>
                    <Form>
                        <Form.Group>

                            <Form.Label>First Name</Form.Label>
                            <Form.Control name='firstname' defaultValue={user.firstname} onChange={onChangeUser} />
                            <p className="error-update">{firstnameError}</p>

                            <Form.Label>Last Name</Form.Label>
                            <Form.Control name='lastname' defaultValue={user.lastname} onChange={onChangeUser} />
                            <p className="error-update">{lastnameError}</p>

                        </Form.Group>
                    </Form>
                    <div className="my-info-buttons-container">
                        <Button className='submit-changes-info bg-success' style={{ border: 'none', height: '30px' }} onClick={handleSubmitChanges}>Submit Changes</Button>
                        <Button className='cancel-changes-info bg-danger' style={{ border: 'none', height: '30px' }} onClick={handleCancelEditClick}>Cancel Changes</Button>
                    </div>
                </>
                :

                <div className='card-user-info'>
                    <div className='card-company-content'>
                        Email: {user.username}
                        <br />
                        First Name: {user.firstname}
                        <br />
                        Last Name: {user.lastname}
                        <br />

                    </div>
                    <div className="my-info-buttons-container">
                        <Button className='cancel-changes-info bg-warning' style={{ border: 'none', height: '30px' }} onClick={handleOnEditClick}>Edit My Info <FaUserCircle /></Button>
                    </div>
                </div>
            }
        </div>
    )
}

export default AdminInfo