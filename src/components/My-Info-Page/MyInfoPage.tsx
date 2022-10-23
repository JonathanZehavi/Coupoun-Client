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

  const [editMyInfoMode, setEditMyInfoMode] = useState<boolean>(false)

  const [user, setUser] = useState<{ [key: string]: string | number | any | IUser }>({})
  const [customer, setCustomer] = useState<{ [key: string]: string | number | any | ICustomer }>({})
  const [company, setCompany] = useState<{ [key: string]: string | number| any | ICompany }>({})


  async function getUser(id: number) {
    axios.get(`http://localhost:8080/users/${id}`)
      .then(response => {
        let serverResponse = response.data
        setUser(serverResponse)
        console.log(user);
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
  let handleCancelEditClick = () => {
    setEditMyInfoMode(false)
  }

  let handleOnEditClick = () => {
    setEditMyInfoMode(true)
  }


  let userId = JSON.parse(localStorage.getItem('userId'))
  let companyId = JSON.parse(localStorage.getItem('companyId'))

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

              <Form>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control defaultValue={user.firstname} />
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control defaultValue={user.lastname} />

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
                      <Form.Control defaultValue={customer.address} />
                      <Form.Label>Amount Of Kids</Form.Label>
                      <Form.Control defaultValue={customer.amountOfChildren} />
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control defaultValue={customer.phoneNumber} />
                    </>
                  }
                </Form.Group>
              </Form>

              :
              <Card.Text className='card-my-info-text'>

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
                  </div>
                }

                {localStorage.getItem('userRole') === 'Company' &&
                  <div>
                    Company Name: {company.companyName}
                    <br />
                    Address: {company.address}
                    <br />
                    Phone Number: {company.phoneNumber}
                  </div>
                }

              </Card.Text>
            }
          </>
          <div className='button-edit-info-container'>
            {editMyInfoMode ?
              <>
                <Button className='submit-changes-info bg-success' style={{ border: 'none' }}>Submit Changes</Button>
                <Button className='cancel-changes-info bg-danger' style={{ border: 'none' }} onClick={handleCancelEditClick}>Cancel Changes</Button></>
              :
              <Button className='button-edit-info bg-warning' style={{border: 'none'}} onClick={handleOnEditClick} ><MdEditNote />Edit My Info</Button>
            }
          </div>
        </Card.Body>
      </Card>




    </div>
  )
}

export default MyInfoPage