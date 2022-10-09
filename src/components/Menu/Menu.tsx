import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Dropdown, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { ICoupon } from '../../Model/ICoupon';
import { ActionType } from '../../Redux/action-type';
import { AppState } from '../../Redux/app-state'
import './Menu.css'



export function Menu() {

  let dispatch = useDispatch()

  let allCoupons: ICoupon[] = useSelector((state: AppState) => state.couponsByCategory)

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
    if (e.target.name === "All"){
        window.location.reload();
    }
    getCouponsByCategory(e.target.name);
  })

  useEffect(() => {
    getCoupons()
  }, [])

  let handleChange = (e: any) => {
    if (e.target.checked) {
      sortBy(e.target.id).then((data: any) => data.json()).then(console.log);
    }
  }

  return (
    <div className='aside_content'>
      <>
      <div>
        <h5>Pick coupons from a specific category:</h5>
        <Dropdown>
          <Dropdown.Toggle style={{ backgroundColor: "gray" }}>
            Category
          </Dropdown.Toggle>
          <Dropdown.Menu>     
            <Dropdown.Item onClick={handleCategoryPicked} name='All'>Show All</Dropdown.Item>
            {allCoupons.map((coupon: ICoupon) => {
              return <Dropdown.Item onClick={handleCategoryPicked} key={coupon.id} name={coupon.category}>{coupon.category}</Dropdown.Item>
            })}            
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Form onChange={handleChange}>
        <Form.Check id='title' label='Sort By Title' name='sorting-parameter' type="radio" />
        <Form.Check id='endDate' label='Sort By Expiration Date' name='sorting-parameter' type="radio" />
        <Form.Check id='category' label='Sort By Category' name='sorting-parameter' type="radio" />
        <Form.Check id='priceHighToLow' label='Sort By Price High To Low' name='sorting-parameter' type="radio" />
        <Form.Check id='priceLowToHigh' label='Sort By Price Low To High' name='sorting-parameter' type="radio" />
      </Form>
      </>
    </div>
  )
}

export default Menu
