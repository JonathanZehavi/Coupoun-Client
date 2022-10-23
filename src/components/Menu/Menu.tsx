import axios from 'axios';
import { useEffect } from 'react'
import { Button, Dropdown } from 'react-bootstrap';
import { TbCirclePlus } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { ICoupon } from '../../Model/ICoupon';
import { ActionType } from '../../Redux/action-type';
import { AppState } from '../../Redux/app-state'
import './Menu.css'



export function Menu() {

  let dispatch = useDispatch()
  let navigate = useNavigate()

  let allCoupons: ICoupon[] = useSelector((state: AppState) => state.couponsByCategory)

  let categories = new Set(allCoupons.map(coupon => coupon.category))

  let allCategories = Array.from(categories)

  async function getCoupons() {
    axios.get("http://localhost:8080/coupons")
      .then(response => {
        let serverResponse = response.data
        dispatch({ type: ActionType.getCouponsByCategory, payload: serverResponse })
      }
      )
      .catch(error => alert(error.message));
  }

  async function sortBy(parameterToSortBy: string) {
    axios.get(`http://localhost:8080/coupons/parameterToSortByAscending?sortAscending=${parameterToSortBy}`)
      .then(response => {
        let serverResponse = response.data
        dispatch({ type: ActionType.getAllCoupons, payload: serverResponse })

      }
      )
      .catch(error => alert(error.message));
  }

  async function getCouponsByCategory(category: string) {
    axios.get(`http://localhost:8080/coupons/byCategory?category=${category}`)
      .then(response => {
        let serverResponse = response.data
        dispatch({ type: ActionType.getAllCoupons, payload: serverResponse })
        return serverResponse
      }
      )
      .catch(error => alert(error.message));
  }

  let handleCategoryPicked = ((e: any) => {
    if (e.target.name === "All") {
      sortBy("title")
    } else {
      getCouponsByCategory(e.target.name);
    }
  })

  let handleOpenModal = () => {
    dispatch({ type: ActionType.openModal, payload: true })
  }


  let handleChange = (e: any) => {
    console.log(e);
    sortBy(e).then((data: any) => data.json());
  }

  useEffect(() => {
    getCoupons()
  }, [])



  return (
    <div className='aside_content'>
      <>
        <div>
          <Dropdown>
            <Dropdown.Toggle style={{ backgroundColor: "#333", width: "200px", fontSize: "16px", border: "none" }}>
              Categories
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ width: "200px" }}>
              <Dropdown.Item onClick={handleCategoryPicked} name='All'>Show All</Dropdown.Item>
              {allCategories.map((category: string, index) => {
                return <Dropdown.Item onClick={handleCategoryPicked} key={index} name={category}>{category}</Dropdown.Item>
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div>

          <Dropdown onSelect={handleChange} >
            <Dropdown.Toggle style={{ backgroundColor: "#333", width: "200px", fontSize: "16px", border: "none" }}>
              Sort Items
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ width: "200px", border: "none" }}>
              <Dropdown.Item eventKey={"title"} id='title' name='sorting-parameter'>Ttile</Dropdown.Item>
              <Dropdown.Item eventKey={"endDate"} id='endDate' name='sorting-parameter'>Expiration Date</Dropdown.Item>
              <Dropdown.Item eventKey={"category"} id='category' name='sorting-parameter' type="radio">Category</Dropdown.Item>
              <Dropdown.Item eventKey={"price"} id='price' name='sorting-parameter'>Price Low To High</Dropdown.Item>
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
