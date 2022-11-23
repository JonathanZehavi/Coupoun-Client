import axios from 'axios'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { Button, Card, Stack } from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'
import { MdDeleteForever, MdEditNote } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ICompany } from '../../../Model/ICompany'
import { ICoupon } from '../../../Model/ICoupon'
import { ActionType } from '../../../Redux/action-type'
import { AppState } from '../../../Redux/app-state'
import './SingleCompanyPage.css'

function SingleCompanyPage() {


  let { id } = useParams()

  let dispatch = useDispatch()
  let navigate = useNavigate()

  const [editCompanyMode, setEditCompanyMode] = useState<boolean>(false)


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
        let serverResponse = [...response.data]
        dispatch({ type: ActionType.getCouponsByCompanyId, payload: serverResponse })
      }).catch(error => {
        if (error.message.includes("403")) {
          navigate("/unauthorized")
        }
      });
  }

  async function getCompanyById(id: number) {
    axios.get(`http://localhost:8080/companies/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      }).then(response => {
        let serverResponse = { ...response.data }
        setCompany(serverResponse)
      }).catch(error => {
        if (error.message.includes("403")) {
          navigate("/unauthorized")
        }
      });
  }

  async function updateCompany(id: number, comapny: { [key: string]: string | number | any | ICompany }) {
    axios.put(`http://localhost:8080/companies/${id}`, comapny,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
      }).catch(error => {
        if (error.message.includes("403")) {
          navigate("/unauthorized")
        }
      });
  }

  const deleteCompany = (id: number) => {
    if (window.confirm("Are you sure you want to delete this company? this action will lead deleting all linked coupons")) {
      axios.delete(`http://localhost:8080/companies/${id}`, {
        headers: {
          'Authorization': `${localStorage.getItem('token')}`
        },
      }
      ).catch(error => {
        if (error.message.includes("403")) {
          navigate("/unauthorized")
        }
      });
      navigate("/")
    }
  }

  let handleEditCompanyClick = () => {
    setEditCompanyMode(true)
  }
  let handleCancelEditCompanyClick = () => {
    setEditCompanyMode(false)
  }

  let onChange = (e: ChangeEvent<HTMLInputElement>) => {
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


  useEffect(() => {
    getCouponsByComnpanyId(JSON.parse(id))
    getCompanyById(JSON.parse(id))

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
            <Button variant='success' onClick={submitChanges}>Submit</Button>
            <Button variant='danger' onClick={handleCancelEditCompanyClick}>Cancel</Button>
          </div>

        </div>
        :
        id &&
        <Card className='card-single-company'>
          <Card.Body>
            <Card.Header className='single-company-card-header'>
              {company.companyName}, ID: {company.id}
            </Card.Header>

            <Card.Text className='single-comapny-card-text'>
              Address: {company.address}
              <br />
              Phone Number: {company.phoneNumber}
            </Card.Text>
            <Card.Footer className='single-company-card-footer'>

              <Button variant='danger' onClick={() =>
                confirmAlert({
                  title: `Are you sure you want to delete '${company.companyName}'? This action will lead deleting all the coupons linked to this company`,
                  buttons: [
                    {
                      label: 'Yes',
                      onClick: () => deleteCompany(JSON.parse(id))
                    },
                    {
                      label: 'No',
                    }
                  ],
                })}
              >Delete <MdDeleteForever /></Button>
              <Button variant='warning' style={{ color: "white" }} onClick={handleEditCompanyClick}>Edit <MdEditNote /></Button>
            </Card.Footer>
          </Card.Body>
        </Card>
      }

      {coupons.length ?
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
          }
          )}
        </div>
        :
        <div className='no-coupons-message'>There are no coupons available for this company yet</div>

      }
    </div>
  )
}

export default SingleCompanyPage