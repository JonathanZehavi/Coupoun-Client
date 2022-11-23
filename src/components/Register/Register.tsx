import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ICustomer } from '../../Model/ICustomer';
import { ActionType } from '../../Redux/action-type';
import LoadingSpinner from '../Login/LoadingSpinner';
import "./Register.css";

function Register() {


  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function createCustomer(customer: ICustomer) {
    axios.post("http://localhost:8080/customers", customer)
      .then(response => {
        let serverResponse = response.data
      }).catch(error => alert(error.message))
  }

  async function isExistByUsername(username: string) {
    const response = await axios.get(`http://localhost:8080/users/isExistByUsername?username=${username}`)
    return response.data
  }


  const [newCustomer, setNewCustomer] = useState<ICustomer>({
    user: {
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      role: "Customer"
    },
    address: "",
    amountOfChildren: 0,
    phoneNumber: "",
    birthday: []
  })


  const [firstnameError, setFirstnameError] = useState<string>("")
  const [lastnameError, setLastnameError] = useState<string>("")
  const [emailError, setEmailError] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string>("")
  const [addressError, setAddressError] = useState<string>("")
  const [phoneNumberError, setPhoneNumberError] = useState<string>("")
  const [amountOfChildrenError, setAmountOfChildrenError] = useState<string>("")
  const [birthdateError, setBirthdateError] = useState<string>("")

  let navigate = useNavigate()

  let onChange = ((e: ChangeEvent<HTMLInputElement>) => {

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
    if (e.target.name === "amountOfChildren") {
      setAmountOfChildrenError("")
    }
    if (e.target.name === "birthday") {
      setBirthdateError("")
    }
    setNewCustomer({
      ...newCustomer,
      user: {
        ...newCustomer.user,
        [e.target.name]: e.target.value
      },
      [e.target.name]: e.target.value
    })
  })


  const sendForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true)

    let isValid: boolean = true;

    let isUsernameExist = await isExistByUsername(newCustomer.user.username)

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
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}/i.test(newCustomer.user.password)) {
      setPasswordError("Password must include at least 8 chars, not more than 12 chars, one uppercase and one lower case")
      isValid = false
    }
    if (!newCustomer.address) {
      setAddressError("Address is require")
      isValid = false
    }
    if (!newCustomer.amountOfChildren) {
      setNewCustomer({ ...newCustomer, [newCustomer.amountOfChildren]: 0 })
    }
    if (newCustomer.amountOfChildren < 0) {
      setAmountOfChildrenError("Amount of Children Cannot be below 0")
    }
    if (!/^\+?(972|0)(\-)?0?(([23489]{1}\d{7})|[5]{1}\d{8})$/i.test(newCustomer.phoneNumber)) {
      setPhoneNumberError("Phone number is not valid")
      isValid = false
    }
    if (!newCustomer.phoneNumber) {
      setPhoneNumberError("Phone number is required")
      isValid = false
    }
    if (newCustomer.birthday.length < 3) {
      setBirthdateError("Birth date is required")
      isValid = false
    }

    if (isUsernameExist) {
      setEmailError("The email you have entered already exist")
      isValid = false
    }
    if (isValid) {
      createCustomer(newCustomer)
      setTimeout(() => {
        navigate('/login')
      }, 2500)
    } else {
      setIsLoading(false)
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
                <input defaultValue={newCustomer.amountOfChildren} id='6' name='amountOfChildren' type="number" placeholder='Amount Of Kids' min={0} onChange={onChange} />
                <p className='register-error'>{amountOfChildrenError}</p>
              </div>

              <div className='details_register'>
                <label htmlFor="phoneNumber">Phone Number*</label>
                <input defaultValue={newCustomer.phoneNumber} id='7' name='phoneNumber' type="text" placeholder='Phone Number' onChange={onChange} />
                <p className='register-error'>{phoneNumberError}</p>
              </div>

              <div className='details_register'>
                <label htmlFor="birthday">Birth Date*</label>
                <input defaultValue={`${newCustomer.birthday[0]}-${newCustomer.birthday[1]}-${newCustomer.birthday[2]}`} id='8' name='birthday' type="date" placeholder='Birth Date' onChange={onChange} />
                <p className='register-error'>{birthdateError}</p>
              </div>
            </div>
          </div>

          <div className='submit_button_container'>
            <Button style={{ width: '120px', margin: '10px' }} type='submit'>Submit</Button>
          </div>
          <div className='loading-spinner-container'>
            {isLoading && <span className='loadnig-spinner-register-span'><LoadingSpinner /> Signing you up...</span>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;


