import axios from 'axios';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ICustomer } from '../../Model/ICustomer'
import { ActionType } from '../../Redux/action-type';
import { AppState } from '../../Redux/app-state';
import "./Register.css";

function Register() {

  let dispatch = useDispatch();

  let customer: ICustomer = useSelector((state: AppState) => state.customer)


  async function createCustomer(customer: any) {
    axios.post("http://localhost:8080/customers", customer)
      .then(response => {
        let serverResponse = response.data
        dispatch({ type: ActionType.createCustomer, payload: serverResponse })
      }) // ! error
  }

  async function isExistByUsername(username: string) {

    axios.get(`http://localhost:8080/users/isExistByUsername?username=${username}`)
      .then(response => {
        return response.data
      }) // ! error
  }

  // async function createUser(user: IUser) {
  //   axios.post("http://localhost:8080/users", user)
  //     .then(response => {
  //       let serverResponse = response.data
  //       dispatch({ type: ActionType.createUser, payload: serverResponse })
  //     })
  // }
  // let [newUser, setNewUser]: any = useState(
  //   {
  //     username: "",
  //     password: "",
  //     firstname: "",
  //     lastname: "",
  //     role: "Customer"
  //   }
  // )



  let [newCustomer, setNewCustomer] = useState({
    user: {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      role: "Customer"
    },
    address: "",
    amountOfChildren: "",
    phoneNumber: "",
    birthday: ""
  })


  let [firstnameError, setFirstnameError] = useState<string>("")
  let [lastnameError, setLastnameError] = useState<string>("")
  let [emailError, setEmailError] = useState<string>("")
  let [passwordError, setPasswordError] = useState<string>("")
  let [addressError, setAddressError] = useState<string>("")
  let [phoneNumberError, setPhoneNumberError] = useState<string>("")
  let [birthdateError, setBirthdateError] = useState<string>("")

  let navigate = useNavigate()

  let onChange = ((e: any) => {

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
    if (e.target.name === "address") {
      setAddressError("")
    }
    if (e.target.name === "phoneNumber") {
      setPhoneNumberError("")
    }
    if (e.target.name === "birthday") {
      setBirthdateError("")
    }
    console.log(e.target.id);


    if (+e.target.id <= 4) {
      setNewCustomer({
        ...newCustomer,
        user: {
          ...newCustomer.user,
          [e.target.name]: e.target.value
        },

      })
    } else {
      setNewCustomer({ ...newCustomer, [e.target.name]: e.target.value })
    }
  })


  const sendForm = (e: any) => {
    e.preventDefault();
    console.log(newCustomer);

    let isValid: boolean = true;

    if (!newCustomer.user.firstname) {
      setFirstnameError("First name is required")
      isValid = false
    }
    if (!newCustomer.user.lastname) {
      setLastnameError("Last Name is required")
      isValid = false
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(newCustomer.user.username)) {
      setEmailError("Email address is invalid")
      isValid = false
    }
    if (!/^[A-Za-z]\w{7,14}$/i.test(newCustomer.user.password)) {
      setPasswordError("Password is invalid")
      isValid = false
    }
    if (!newCustomer.address) {
      setAddressError("Address is require")
      isValid = false
    }
    if (!newCustomer.amountOfChildren) {
      setNewCustomer({ ...newCustomer, [newCustomer.amountOfChildren]: 0 })
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
    if (!isExistByUsername(newCustomer.user.username)) {
      setEmailError("The email you have entered already exist")
      isValid = false
    }
    if (isValid) {
      createCustomer(newCustomer)
      navigate('/login')
    }
  }



  return (

    <div className='full_screen_register'>

      <div className='container_signup'>

        <div className="title_register_container">

          <h1 className='title_register'>Sign Up</h1>
        </div>

        <form className='register_form' onSubmit={sendForm}>
          
          <div className='register-form-middle-area'>
            <div className='register-part-one'>
              <div className='details_register'>
                <label htmlFor="firstname">First Name*</label>
                <input defaultValue={newCustomer.user.firstname} id='1' name='firstname' type="text" placeholder='First Name' onChange={onChange} />
                <p className='register-error'>{firstnameError}</p>
              </div>

              <div className='details_register'>
                <label htmlFor="lastname">Last Name*</label>
                <input defaultValue={newCustomer.user.lastname} id='2' name='lastname' type="text" placeholder='Last Name' onChange={onChange} />
                <p className='register-error'>{lastnameError}</p>
              </div>

              <div className='details_register'>
                <label htmlFor="email">Email*</label>
                <input defaultValue={newCustomer.user.username} id='3' name='username' type="email" placeholder='Email' onChange={onChange} />
                <p className='register-error'>{emailError}</p>
              </div>

              <div className='details_register'>
                <label htmlFor="password">Password*</label>
                <input defaultValue={newCustomer.user.password} id='4' name='password' type="password" placeholder='Password' onChange={onChange} />
                <p className='register-error'>{passwordError}</p>
              </div>

            </div>
            <div className='register-part-two'>
              <div className='details_register'>
                <label htmlFor="address">Address*</label>
                <input defaultValue={newCustomer.address} id='5' name='address' type="text" placeholder='Address' onChange={onChange} />
                <p className='register-error'>{addressError}</p>
              </div>

              <div className='details_register'>
                <label htmlFor="amountOfChildren">Amount Of Kids</label>
                <input defaultValue={newCustomer.amountOfChildren} id='6' name='amountOfChildren' type="number" placeholder='Amount Of Kids' onChange={onChange} />
                <p className='register-error'></p>
              </div>

              <div className='details_register'>
                <label htmlFor="phoneNumber">Phone Number*</label>
                <input defaultValue={newCustomer.phoneNumber} id='7' name='phoneNumber' type="text" placeholder='Phone Number' onChange={onChange} />
                <p className='register-error'>{phoneNumberError}</p>
              </div>

              <div className='details_register'>
                <label htmlFor="birthday">Birth Date*</label>
                <input defaultValue={newCustomer.birthday} id='8' name='birthday' type="date" placeholder='Birth Date' onChange={onChange} />
                <p className='register-error'>{birthdateError}</p>
              </div>
            </div>
          </div>

          <div className='submit_button_container'>
            <Button style={{ width: '120px' }} type='submit'>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;


