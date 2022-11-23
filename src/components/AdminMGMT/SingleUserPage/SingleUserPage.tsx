import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'
import { FaUserCircle } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { IUser } from '../../../Model/IUser'
import './SingleUserPage.css'

function SingleUserPage() {

    let navigate = useNavigate()
    let { id } = useParams()

    const [user, setUser] = useState<{ [key: string]: string | number | any | IUser }>({})

    async function deleteUser(id: number) {
        axios.get(`http://localhost:8080/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).catch(error => {
            if (error.message.includes("403")) {
                navigate("/unauthorized")
            }
        });
    }


    async function getUserById(id: number) {
        axios.get(`http://localhost:8080/users/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then(response => {
                let serverResponse = { ...response.data }
                setUser(serverResponse)
            }).catch(error => {
                if (error.message.includes("403")) {
                    navigate("/unauthorized")
                }
            });
    }

    useEffect(() => {
        getUserById(JSON.parse(id))
    }, [])



    return (
        <div className='single-user-page-container'>
            <div>
                <Card className='single-user-card'>
                    <Card.Header className='single-user-card-header-container'>
                        <div className='single-user-card-header'>
                            <div>ID: {user.id}</div>
                            <div><FaUserCircle style={{ fontSize: "40px" }} /></div>
                        </div>
                    </Card.Header>
                    <Card.Body className='single-user-card-body'>
                        <Card.Text><span className='single-user-card-titles'>Full Name: </span>{user.lastname}, {user.firstname}</Card.Text>
                        <Card.Text><span className='single-user-card-titles'>Email: </span>{user.username}</Card.Text>
                        <Card.Text><span className='single-user-card-titles'>User Role: </span>{user.role}</Card.Text>
                        {user.role === "Company" &&
                            <Card.Text><span className='single-user-card-titles'>Company ID: </span>{user.companyId}</Card.Text>
                        }
                    </Card.Body>
                    <Card.Footer className='single-user-card-footer'>
                        <Button onClick={() => {
                            confirmAlert({
                                title: `Are you sure you want to delete this user? 
                                some of the data on this site may be affected. 
                                (to learn more about this click ${<Link to={'/guide'}>here</Link>})`,
                                buttons: [
                                    {
                                        label: 'Yes',
                                        onClick: () => deleteUser(user.id)
                                    },
                                    {
                                        label: 'No',
                                    }
                                ],
                            })
                        }
                        }
                            variant='danger' style={{ width: "160px", fontSize: "18px" }}>Delete User</Button>
                        <Button variant='success' style={{ width: "160px", fontSize: "18px" }}>Reset Password</Button>
                    </Card.Footer>
                </Card>
            </div>
        </div >
    )
}

export default SingleUserPage