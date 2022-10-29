import axios from 'axios'
import { useEffect, useState } from 'react'
import { Button, Card, Stack } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ICompany } from '../../Model/ICompany'
import { ICoupon } from '../../Model/ICoupon'
import { ActionType } from '../../Redux/action-type'
import { AppState } from '../../Redux/app-state'
import './SingleCompanyPage.css'

function SingleCompanyPage() {

  let dispatch = useDispatch()
  let navigate = useNavigate()

  const [editCompanyMode, setEditCompanyMode] = useState<boolean>(false)

  let { id } = useParams()

  const [company, setCompany] = useState<{ [key: string]: string | number | any | ICompany }>({})

  const [companyNameError, setCompanyNameError] = useState<string>("")
  const [addressError, setAddressError] = useState<string>("")
  const [phonNumberError, setPhoneNumberError] = useState<string>("")

  let coupons = useSelector((state: AppState) => state.couponsByCompanyId)

  async function getCouponsByComnpanyId(id: number) {
    axios.get(`http://localhost:8080/coupons/byCompanyId/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response => {
        let serverResponse = response.data
        dispatch({ type: ActionType.getCouponsByCompanyId, payload: serverResponse })
      }).catch(error => alert(error.message))
  }


  async function updateCompany(id: number, comapny: { [key: string]: string | number | any | ICompany }) {
    axios.put(`http://localhost:8080/companies/${id}`, comapny,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response => {
        let serverResponse = response.data
      }).catch(error => alert(error.message))
  }

  let handleEditCompanyClick = () => {
    setEditCompanyMode(true)
  }
  let handleCancelEditCompanyClick = () => {
    setEditCompanyMode(false)
  }

  let onChange = (e: any) => {
    if (e.target.name === "companyName") {
      setCompanyNameError("")
    }
    if (e.target.name === "address") {
      setAddressError("")
    }
    if (e.target.name === "phoneNumber") {
      setPhoneNumberError("")
    }

    setCompany({ ...company, [e.target.name]: e.target.value })
  }

  let submitChanges = () => {

    let isValid = true;

    if (!company.companyName) {
      setCompanyNameError("Company name is required")
      isValid = false
    }
    if (!company.address) {
      setAddressError("Address is required")
      isValid = false
    }
    if (!company.phoneNumber) {
      setPhoneNumberError("Phone Number is required")
      isValid = false
    }

    if (isValid) {
      updateCompany(JSON.parse(id), company)
      setEditCompanyMode(false)
    }
  }


  let handleDeleteCompanyClick = () => {
    window.confirm("Are you sure you want to delete?")
    if ("Yes") {

    }
  }

  useEffect(() => {
    getCouponsByComnpanyId(JSON.parse(id))
    fetch(`http://localhost:8080/companies/${JSON.parse(id)}`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      }).then(data => data.json()).then(setCompany);
  }, [])


  return (
    <div className='single-company-page-container'>

      {editCompanyMode ?
        <div className='form-edit-company-container'>
          <div className='edit-company-details'>
            <label htmlFor="companyName">Company Name:</label>
            <input name='companyName' type="text" onChange={onChange} defaultValue={company.companyName} />
            <p className='error-company-form'>{companyNameError}</p>
          </div>
          <div className='edit-company-details'>
            <label htmlFor="address">Company's Address:</label>
            <input name='address' type="text" onChange={onChange} defaultValue={company.address} />
            <p className='error-company-form'>{addressError}</p>
          </div>
          <div className='edit-company-details'>
            <label htmlFor="phoneNumber">Company's Phone Number:</label>
            <input name='phoneNumber' type="text" onChange={onChange} defaultValue={company.phoneNumber} />
            <p className='error-company-form'>{phonNumberError}</p>
          </div>
          <div className="buttons-company-container">
            <Button onClick={submitChanges}>Submit</Button>
            <Button onClick={handleCancelEditCompanyClick}>Cancel</Button>
          </div>

        </div>
        :
        id &&
        <Card className='card-single-company'>
          <Card.Body>
            <Card.Header className='single-company-card-header'>
              {company.companyName}
            </Card.Header>

            <Card.Text className='single-comapny-card-text'>
              Address: {company.address}
              <br />
              Phone Number: {company.phoneNumber}
            </Card.Text>
            <Card.Footer className='single-company-card-footer'>
              <Button onClick={handleEditCompanyClick}>Edit</Button>
              <Button>Delete</Button>
            </Card.Footer>
          </Card.Body>
        </Card>
      }



      <div className='coupons-company-container'>

        {coupons.map((coupon: ICoupon) => {
          return <Stack className='coupon-card-on-company-page' direction="horizontal" gap={2}>
            <Link className='link_to_coupon' to={`/coupon/${coupon.id}`}>
              <img src={coupon.image} alt='coupon-card-img' style={{
                width: "125px",
                height: "125px",
                objectFit: "cover"
              }} />
            </Link>


            <div className="me-auto">
              <div>
                {coupon.title}{" "}
              </div>
              <div className="text-muted" style={{ fontSize: ".75rem" }}>
                ${coupon.price}
              </div>
            </div>
          </Stack>
        })}
      </div>

    </div>
  )
}

export default SingleCompanyPage