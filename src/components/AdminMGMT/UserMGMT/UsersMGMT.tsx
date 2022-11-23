import axios from 'axios'
import { response } from 'express'
import React, { useEffect, useState } from 'react'
import { Button, Stack } from 'react-bootstrap'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { VscPerson } from 'react-icons/vsc'
import { MdOutlineCorporateFare, MdVerifiedUser } from 'react-icons/md'
import ReactPaginate from 'react-paginate'
import { useDispatch, useSelector } from 'react-redux'
import { IUser } from '../../../Model/IUser'
import { ActionType } from '../../../Redux/action-type'
import { AppState } from '../../../Redux/app-state'
import CreateUserModal from '../../Modals/CreateUserModal'
import './UsersMGMT.css'
import { useNavigate } from 'react-router-dom'

function UsersMGMT() {
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let isOpen = useSelector((state: AppState) => state.openUserModal)

    let usersByPage = useSelector((state: AppState) => state.usersByPage)
    let users = useSelector((state: AppState) => state.users)

    let userId = JSON.parse(localStorage.getItem("userId"))

    let userByPageFiltered = usersByPage.filter(user => user.id !== userId)


    let usersList = users.filter(user => user.id !== userId)

    const [pageNumber, setPageNumber] = useState<number>(0)

    const usersPerPage = 6

    let pageCount = Math.ceil(usersList.length / usersPerPage)

    async function getUsers() {
        await axios.get("http://localhost:8080/users", {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        }).then(response => {
            let serverResponse = response.data
            dispatch({ type: ActionType.getAllUsers, payload: serverResponse })
        }).catch(error => {
            if (error.message.includes("403")) {
                navigate("/unauthorized")
            }
        });
    }




    async function setItemsPerPage(pageNumber: number, usersPerPage: number) {
        axios.get(`http://localhost:8080/users/pages/${pageNumber}/${usersPerPage}`,
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                let serverResponse = response.data
                dispatch({ type: ActionType.getUsersByPage, payload: serverResponse })
            }
            )
            .catch(error => {
                if (error.message.includes("403")) {
                    navigate("/unauthorized")
                }
            });
    }

    let handleUserSelected = (id: number) => {
        navigate(`/user/${id}`)
    }

    let changePage = ({ selected }: { selected: number }): void => {
        setPageNumber(selected)
    }

    let handleCreateUserClick = () => {
        dispatch({ type: ActionType.openUserModal, payload: true })
    }

    useEffect(() => {
        getUsers()
        setItemsPerPage(pageNumber, usersPerPage)
    }, [pageNumber])



    return (
        <div className='users-mgmt-container'>
            {isOpen && <CreateUserModal />}
            <div className='create-new-user-button-container'>
                <Button className='create-new-user-button bg-success'
                    style={{
                        border: "none",
                        width: "220px",
                        height: "45px",
                        fontSize: "20px"
                    }} onClick={handleCreateUserClick}>Create new User  <AiOutlineUserAdd style={{ fontSize: "25px" }} /></Button>
            </div>
            <div className='users-cards-area'>
                {userByPageFiltered.map((user: IUser) => {
                    return <>
                        <div className='user-single-card' key={user.id}>
                            {user.role === "Admin" && <div><MdVerifiedUser /> ID: {user.id}</div>}
                            {user.role === "Company" && <div><MdOutlineCorporateFare /> ID: {user.id}</div>}
                            {user.role === "Customer" && <div><VscPerson /> ID: {user.id}</div>}
                            <div>First Name: {user.firstname}</div>
                            <div>Last Name: {user.lastname}</div>
                            <div>Email: {user.username}</div>
                            <div>Role: {user.role}</div>
                            <div><Button onClick={() => handleUserSelected(user.id)}>Go to user page</Button></div>
                        </div>
                    </>
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

export default UsersMGMT

