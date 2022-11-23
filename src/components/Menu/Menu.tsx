import axios from 'axios';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import { Button, Dropdown, DropdownProps } from 'react-bootstrap';
import { TbCirclePlus } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { ICoupon } from '../../Model/ICoupon';
import { ActionType } from '../../Redux/action-type';
import { AppState } from '../../Redux/app-state'
import './Menu.css'



export function Menu() {

  const [parameter, setParameter] = useState<string>("")
  const [categoryPicked, setCategoryPicked] = useState<string>("")

  let dispatch = useDispatch()
  let navigate = useNavigate()

  let pageNumber = useSelector((state: AppState) => state.pageNumber)

  let couponsByCategotry: ICoupon[] = useSelector((state: AppState) => state.couponsByCategory)

  let pageSize = 10;

  let categories = new Set(couponsByCategotry.map(coupon => coupon.category))

  let allCategories = Array.from(categories)



  async function getCoupons() {
    axios.get("http://localhost:8080/coupons")
      .then(response => {
        let serverResponse = response.data
        dispatch({ type: ActionType.getAllCoupons, payload: serverResponse })
      }
      )
      .catch(error => alert(error.message));
  }


  async function sortBy(pageNumber: number, pageSize: number, parameterToSortBy: string) {
    axios.get(`http://localhost:8080/coupons/pageAndSortAscending/${pageNumber}/${pageSize}?parameterToSortBy=${parameterToSortBy}`)
      .then(response => {
        let serverResponse = response.data
        dispatch({ type: ActionType.getCouponsByPage, payload: serverResponse })
      }
      )
      .catch(error => alert(error.message));
  }

  async function setItemsPerPage(pageNumber: number, couponsPerPage: number) {
    axios.get(`http://localhost:8080/coupons/pages/${pageNumber}/${couponsPerPage}`)
      .then(response => {
        let serverResponse = response.data
        dispatch({ type: ActionType.getCouponsByPage, payload: serverResponse })
      }
      )
      .catch(error => alert(error.message));
  }

  async function getCouponsByCategory(category: string) {
    axios.get(`http://localhost:8080/coupons/byCategory?category=${category}`)
      .then(response => {
        let serverResponse = response.data
        dispatch({ type: ActionType.getAllCoupons, payload: serverResponse })
        dispatch({ type: ActionType.getCouponsByPage, payload: serverResponse })
        return serverResponse
      }
      )
      .catch(error => alert(error.message));
  }



  let handleCategoryPicked = ((eventKey: string) => {
    setCategoryPicked(eventKey)
    if (eventKey === "All") {
      setItemsPerPage(0, 10)
      getCoupons()
    } else {
      getCouponsByCategory(eventKey)
    }
  })

  let handleOpenModal = () => {
    dispatch({ type: ActionType.openModal, payload: true })
  }


  useEffect(() => {
    getCoupons()
  }, [parameter])



  return (
    <div className='aside_content'>
      <>
        <div>
          <Dropdown onSelect={handleCategoryPicked}>
            <Dropdown.Toggle style={{ backgroundColor: "#333", width: "200px", fontSize: "16px", border: "none" }}>
              {(categoryPicked && categoryPicked !== "All") ? `${categoryPicked}` : "Categories"}
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ width: "200px" }}>
              <Dropdown.Item eventKey={'All'}>Show All</Dropdown.Item>
              {allCategories.map((category: string, index) => {
                return <Dropdown.Item eventKey={category} key={index} name={category}>{category}</Dropdown.Item>
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div>

          <Dropdown onSelect={(eventKey: string) => {
            setParameter(eventKey)
            sortBy(pageNumber, pageSize, eventKey)

          }} >
            <Dropdown.Toggle style={{ backgroundColor: "#333", width: "200px", fontSize: "16px", border: "none" }} >
              {parameter ? (parameter === "endDate" ? "Expired date" : `${parameter}`) : "Sort Coupons"}
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ width: "200px", border: "none" }}>
              <Dropdown.Item eventKey="title" id='title' name='title'>Ttile</Dropdown.Item>
              <Dropdown.Item eventKey="endDate" id='endDate' name='endDate'>Expiration Date</Dropdown.Item>
              <Dropdown.Item eventKey="category" id='category' name='category' type="radio">Category</Dropdown.Item>
              <Dropdown.Item eventKey="price" id='price' name='price'>Price Low To High</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

        </div>
        <div className='add-coupon-button'>
          {(localStorage.getItem("userRole") === "Admin" || localStorage.getItem("userRole") === "Company") &&
            <Button onClick={handleOpenModal} className='bg-success' style={{ fontSize: "13px", border: "none" }}><TbCirclePlus style={{ fontSize: "15px" }} /> Create New Coupon </Button>
          }
        </div>
      </>
    </div>
  )
}

export default Menu
