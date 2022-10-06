import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../model/IUser';
import { ICustomer } from '../../model/ICustomer'
import { ActionType } from '../../redux/action-type';
import { AppState } from '../../redux/app-state';
import "./Register.css";
import { stat } from 'fs';


function Register() {

  let dispatch = useDispatch();

  let users: IUser[] = useSelector((state: AppState) => state.users)

  let customers: ICustomer[] = useSelector((state: AppState) => state.customers)

  async function createUser(user: IUser) {
    axios.post("http://localhost:8080/users")
      .then(response => {
        let serverResponse = response.data
        dispatch({ type: ActionType.createUser, payload: serverResponse })
      })
  }
  async function createCustomer(customer: ICustomer) {
    axios.post("http://localhost:8080/customer")
      .then(response => {
        let serverResponse = response.data
        dispatch({ type: ActionType.createCustomer, payload: serverResponse })
      })
  }



  async function getAllCustomers() {
    axios.get("http://localhost:8080/customers")
      .then(response => {
        let serverResponse = response.data
        dispatch({ type: ActionType.getAllCustomers, payload: serverResponse })
      })

  }
  async function getAllUsers() {
    axios.get("http://localhost:8080/users")
      .then(response => {
        let serverResponse = response.data
        dispatch({ type: ActionType.getAllUsers, payload: serverResponse })
      })

  }


  let [newUser, setNewUser]: any = useState(
    {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      role: "Customer"
    }
  )

  let [firstnameError, setFirstnameError]: any = useState("")
  let [lastnameError, setLastnameError]: any = useState("")
  let [emailError, setEmailError]: any = useState("")
  let [passwordError, setPasswordError]: any = useState("")

  let navigate = useNavigate()


  useEffect(() => {
    getAllUsers()
    getAllCustomers()
  }, [])


  let onChange = ((e: any) => {

    setNewUser({ ...newUser, [e.target.name]: e.target.value })

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
  })

  const sendForm = (e: any) => {
    e.preventDefault();

    let isValid: boolean = true;

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
    if (!/^[A-Za-z]\w{7,14}$/i.test(newUser.password)) {
      setPasswordError("Password is invalid.")
      isValid = false
      // "Password should be between 7-14 letters, and must include at least one uppercase char, one lowercase char and a number."
    }
    if (newUser.username) {
      const currentUser = users.find((user: IUser) => { return newUser.username === user.username })
      if (currentUser) {
        setEmailError("The email you have entered already exist")
        isValid = false
      }
    }

    if (isValid) {

      navigate('/registered-succesfuly')
    }
  }


  return (

    <div className='full_screen_register'>

      <div className='container_signup'>

        <div className="title_register_container">
          <h1 className='title_register'>Sign Up</h1>
        </div>
        <form className='register_form' onSubmit={sendForm}>
          <div className='details'>
            <label htmlFor="firstname">First Name</label>
            <input value={newUser.firstname} id='1' name='firstname' type="text" placeholder='First Name' onChange={onChange} />
            <p className='error'>{firstnameError}</p>
          </div>

          <div className='details'>
            <label htmlFor="lastname">Last Name</label>
            <input value={newUser.lastname} id='2' name='lastname' type="text" placeholder='Last Name' onChange={onChange} />
            <p className='error'>{lastnameError}</p>
          </div>

          <div className='details'>
            <label htmlFor="email">Email</label>
            <input value={newUser.username} id='3' name='username' type="email" placeholder='Email' onChange={onChange} />
            <p className='error'>{emailError}</p>
          </div>

          <div className='details'>
            <label htmlFor="password">Password</label>
            <input value={newUser.password} id='4' name='password' type="password" placeholder='Password' onChange={onChange} />
            <p className='error'>{passwordError}</p>
          </div>
          <div className='submit_button_container'>
            <button type='submit'>Submit</button>
          </div>

        </form>
      </div>
    </div>
  );
}


export default Register;


