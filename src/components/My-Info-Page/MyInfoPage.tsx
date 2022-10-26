import axios from 'axios';
import { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { FaUserCircle } from 'react-icons/fa'
import { ICompany } from '../../Model/ICompany';
import { ICustomer } from '../../Model/ICustomer';
import { IUser } from '../../Model/IUser';
import { MdEditNote } from 'react-icons/md'
import './MyInfoPage.css'

function MyInfoPage() {

  let userId = JSON.parse(localStorage.getItem('userId'))
  let companyId = JSON.parse(localStorage.getItem('companyId'))

  const [editMyInfoMode, setEditMyInfoMode] = useState<boolean>(false)

  const [user, setUser] = useState<{ [key: string]: string | number | any | IUser }>({})
  const [customer, setCustomer] = useState<{ [key: string]: string | number | any | ICustomer }>({})
  const [company, setCompany] = useState<{ [key: string]: string | number | any | ICompany }>({})


  const [newUser, setNewUser] = useState<IUser>({
    id: userId,
    username: user.username,
    password: user.password,
    firstname: user.firstname,
    lastname: user.lastname,
    companyId: companyId,
    role: ""
  })
  
  
  const [newCustomer, setNewCustomer] = useState<ICustomer>()
  const [newCompany, setNewCompany] = useState<ICompany>()


  const [firstnameError, setFirstnameError] = useState("")
  const [lastnameError, setLastnameError] = useState("")
  const [comapnyNameError, setCompanynameError] = useState("")
  const [addressError, setAddressError] = useState("")
  const [phoneNumberError, setPhoneNumberError] = useState("")


  let onChangeUser = (e: any) => {
    if (e.target.name === "firstname") {
      setFirstnameError("")
    }
    if (e.target.name === "lastname") {
      setLastnameError("")
    }
    // setNewUser({ ...newUser, [e.target.name]: e.target.value })
  }

  let onChangeCustomer = (e: any) => {
    if (e.target.name === "firstname") {
      setFirstnameError("")
    }
    if (e.target.name === "lastname") {
      setLastnameError("")
    }
    if (e.target.name === "address"){
      setAddressError("")
    }
    if (e.target.name === "phoneNumber") {
      setPhoneNumberError("")
    }
    setNewCustomer({
      ...newCustomer,
      user: {
        ...newCustomer.user,
        [e.target.name]: e.target.value,
        role: "Customer"
      },
    })
  }




  async function getUser(id: number) {
    axios.get(`http://localhost:8080/users/${id}`)
      .then(response => {
        let serverResponse = response.data
        setUser(serverResponse)
      }
      )
      .catch(error => alert(error.message));
  }

  async function getCustomer(id: number) {
    axios.get(`http://localhost:8080/customers/${id}`)
      .then(response => {
        setCustomer(response.data)
      }
      )
      .catch(error => alert(error.message));
  }

  async function getCompany(id: number) {
    axios.get(`http://localhost:8080/companies/${id}`)
      .then(response => {
        let serverResponse = response.data
        setCompany(serverResponse)
      }
      )
      .catch(error => alert(error.message));
  }




  async function updateUser(id: number, user: IUser) {
    axios.put(`http://localhost:8080/users/${id}`, user)
      .then(response => {
        let serverResponse = response.data
        setUser(serverResponse)
      }
      )
      .catch(error => alert(error.message));
  }

  async function updateCustomer(id: number, customer: ICustomer) {
    axios.put(`http://localhost:8080/customers/${id}`, customer)
      .then(response => {
        setCustomer(response.data)
      }
      )
      .catch(error => alert(error.message));
  }

  async function updateCompany(id: number, company: ICompany) {
    axios.put(`http://localhost:8080/companies/${id}`, company)
      .then(response => {
        let serverResponse = response.data
        setCompany(serverResponse)
      }
      )
      .catch(error => alert(error.message));
  }


  let handleCancelEditClick = () => {
    setEditMyInfoMode(false)
  }

  let handleOnEditClick = () => {
    setEditMyInfoMode(true)
  }

  let handleSubmit = () => {
    if (localStorage.getItem("userRole") === "Customer") {
      console.log(newCustomer);
      updateCustomer(userId, newCustomer)
    }

  }




  useEffect(() => {
    if (localStorage.getItem('userRole') === 'Admin') {
      getUser(userId)
    }
    if (localStorage.getItem('userRole') === 'Customer') {
      getUser(userId)
      getCustomer(userId)
    }
    if (localStorage.getItem('userRole') === 'Company') {
      getUser(userId)
      getCompany(companyId)
    }

  }, [])


  return (
    <div className='my-info-container'>
      <Card className='card-my-info'>
        <Card.Body>




          <>
            <Card.Title className='card-my-info-title'>
              <FaUserCircle style={{ margin: '10px' }} />
              My Info
            </Card.Title>


            {editMyInfoMode ?

              <Form >
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control defaultValue={user.firstname} onChange={onChangeUser} />
                  <p className="error-update">{firstnameError}</p>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control defaultValue={user.lastname} onChange={onChangeUser} />
                  <p className="error-update">{firstnameError}</p>

                  {localStorage.getItem("userRole") === 'Company' &&
                    <>
                      <Form.Label>Company Name</Form.Label>
                      <Form.Control defaultValue={company.companyName} />
                      <Form.Label>Address</Form.Label>
                      <Form.Control defaultValue={company.address} />
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control defaultValue={company.phoneNumber} />
                    </>
                  }
                  {localStorage.getItem("userRole") === 'Customer' &&
                    <>
                      <Form.Label>Address</Form.Label>
                      <Form.Control defaultValue={customer.address} onChange={onChangeCustomer} />
                      <Form.Label>Amount Of Kids</Form.Label>
                      <Form.Control defaultValue={customer.amountOfChildren} onChange={onChangeCustomer} />
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control defaultValue={customer.phoneNumber} onChange={onChangeCustomer} />
                    </>
                  }
                  <div className="submit-and-cancel-buttons-container">
                    <Button className='submit-changes-info bg-success' style={{ border: 'none', height: '30px' }} onClick={handleSubmit}>Submit Changes</Button>
                    <Button className='cancel-changes-info bg-danger' style={{ border: 'none', height: '30px' }} onClick={handleCancelEditClick}>Cancel Changes</Button>
                  </div>
                </Form.Group>
              </Form>

              :
              <><Card.Text className='card-my-info-text'>

                E-Mail: {user.username}
                <br />
                First Name: {user.firstname}
                <br />
                Last Name: {user.lastname}
                <br />

                {localStorage.getItem('userRole') === 'Customer' &&
                  <div>

                    Address: {customer.address}
                    <br />
                    Amount Of Kids: {customer.amountOfChildren}
                    <br />
                    Phone Number: {customer.phoneNumber}
                  </div>}

                {localStorage.getItem('userRole') === 'Company' &&
                  <div>
                    Company Name: {company.companyName}
                    <br />
                    Address: {company.address}
                    <br />
                    Phone Number: {company.phoneNumber}
                  </div>}

              </Card.Text>
                <div className='button-edit-info-container'>
                  <Button className='button-edit-info bg-warning' style={{ border: 'none' }} onClick={handleOnEditClick}><MdEditNote />Edit My Info</Button>
                </div>
              </>
            }
          </>
        </Card.Body>
      </Card>




    </div>
  )
}

export default MyInfoPage