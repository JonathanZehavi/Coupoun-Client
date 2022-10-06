import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IUser } from '../../model/IUser';
import { ICustomer } from '../../model/ICustomer'
import { ActionType } from '../../redux/action-type';
import { AppState } from '../../redux/app-state';
import "./Register.css";

function Register() {

  let dispatch = useDispatch();

  let customer: ICustomer = useSelector((state: AppState) => state.customer)

  async function createUser(user: IUser) {
    axios.post("http://localhost:8080/users", user)
      .then(response => {
        let serverResponse = response.data
        dispatch({ type: ActionType.createUser, payload: serverResponse })
      })
  }

  async function createCustomer(customer: ICustomer) {
    axios.post("http://localhost:8080/customer", customer)
      .then(response => {
        let serverResponse = response.data
        dispatch({ type: ActionType.createCustomer, payload: serverResponse })
      })
  }

  async function isExistByUsername(username: ICustomer) {
    axios.get(`http://localhost:8080/users/isExistByUsername?username=${username}`)
      .then(response => {
        console.log(response.data);
        return response.data
      })
  }

  // let [newUser, setNewUser]: any = useState(
  //   {
  //     username: "",
  //     password: "",
  //     firstname: "",
  //     lastname: "",
  //     role: "Customer"
  //   }
  // )


  let [newCustomer, setNewCustomer]: any = useState(
    {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      role: "Customer",
      address: "",
      amountOfChildren: "",
      phoneNumber: "",
      birthday: "",
    }
  )

  let [firstnameError, setFirstnameError] = useState<string>("")
  let [lastnameError, setLastnameError] = useState<string>("")
  let [emailError, setEmailError] = useState<string>("")
  let [passwordError, setPasswordError] = useState<string>("")
  let [rePasswordError, setRePasswordError] = useState<string>("")
  let [addressError, setAddressError] = useState<string>("")
  let [phoneNumberError, setPhoneNumberError] = useState<string>("")
  let [birthdateError, setBirthdateError] = useState<string>("")

  let navigate = useNavigate()

  let onChange = ((e: any) => {

    setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value })

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
    if (e.target.name === "re-password") {
      setRePasswordError("")
    }
    if (e.target.name === "address") {
      setAddressError("")
    }
    if (e.target.name === "phoneNumber") {
      setPhoneNumberError("")
    }
    if (e.target.name === "birthday") {
      setBirthdateError("")
    }
  })

  const sendForm = (e: any) => {
    e.preventDefault();

    let isValid: boolean = true;

    if (!newCustomer.firstname) {
      setFirstnameError("First name is required")
      isValid = false
    }
    if (!newCustomer.lastname) {
      setLastnameError("Last Name is required")
      isValid = false
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(newCustomer.username)) {
      setEmailError("Email address is invalid")
      isValid = false
    }
    if (!/^[A-Za-z]\w{7,14}$/i.test(newCustomer.password)) {
      setPasswordError("Password is invalid")
      isValid = false
    }
    // "Password should be between 7-14 letters, and must include at least one uppercase char, one lowercase char and a number."
    if (newCustomer.rePassword !== newCustomer.password) {
      setRePasswordError("Passwords does not much")
      isValid = false
    }
    if (!newCustomer.address) {
      setAddressError("Address is require")
      isValid = false
    }
    if (!newCustomer.amountOfChildren) {
      setNewCustomer({ ...newCustomer, [newCustomer.amountOfChildren]: 0 })
      isValid = false
    }
    if (!/^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/i.test(newCustomer.phoneNumber)) {
      setPhoneNumberError("Phone number is not valid")
      isValid = false
    }
    if (!newCustomer.phoneNumber) {
      setPhoneNumberError("Phone number is required")
      isValid = false
    }
    if (!newCustomer.birthday) {
      setBirthdateError("Birth date is required")
      isValid = false
    }
    if (isExistByUsername(newCustomer.username)) {
      setEmailError("The email you have entered already exist")
      isValid = false
    }
    if (isValid) {
      createCustomer(newCustomer)
      navigate('/')
    }

  }


  return (

    <div className='full_screen_register'>

      <div className='container_signup'>

        <div className="title_register_container">

          <h1 className='title_register'>Sign Up</h1>
        </div>

        <form className='register_form' onSubmit={sendForm}>

          <div className='details_register'>
            <label htmlFor="firstname">First Name*</label>
            <input value={newCustomer.firstname} id='1' name='firstname' type="text" placeholder='First Name' onChange={onChange} />
            <p className='error'>{firstnameError}</p>
          </div>

          <div className='details_register'>
            <label htmlFor="lastname">Last Name*</label>
            <input value={newCustomer.lastname} id='2' name='lastname' type="text" placeholder='Last Name' onChange={onChange} />
            <p className='error'>{lastnameError}</p>
          </div>

          <div className='details_register'>
            <label htmlFor="email">Email*</label>
            <input value={newCustomer.username} id='3' name='username' type="email" placeholder='Email' onChange={onChange} />
            <p className='error'>{emailError}</p>
          </div>

          <div className='details_register'>
            <label htmlFor="password">Password*</label>
            <input value={newCustomer.password} id='4' name='password' type="password" placeholder='Password' onChange={onChange} />
            <p className='error'>{passwordError}</p>
          </div>

          <div className='details_register'>
            <label htmlFor="re-password">Re-Password*</label>
            <input value={newCustomer.rePassword} id='5' name='re-password' type="password" placeholder='Re-Password' onChange={onChange} />
            <p className='error'>{rePasswordError}</p>
          </div>

          <div className='details_register'>
            <label htmlFor="amountOfChildren">Amount Of Kids</label>
            <input value={newCustomer.amountOfChildren} id='6' name='amountOfChildren' type="number" placeholder='Amount Of Kids' onChange={onChange} />
            <p className='error'></p>
          </div>

          <div className='details_register'>
            <label htmlFor="phoneNumber">Phone Number*</label>
            <input value={newCustomer.phoneNumber} id='7' name='phoneNumber' type="text" placeholder='Phone Number' onChange={onChange} />
            <p className='error'>{phoneNumberError}</p>
          </div>

          <div className='details_register'>
            <label htmlFor="birthday">Birth Date*</label>
            <input value={newCustomer.birthday} id='8' name='birthday' type="date" placeholder='Birth Date' onChange={onChange} />
            <p className='error'>{birthdateError}</p>
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


