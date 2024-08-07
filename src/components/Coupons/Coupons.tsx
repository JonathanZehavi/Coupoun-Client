import axios from 'axios';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ICoupon } from '../../Model/ICoupon';
import { ActionType } from '../../Redux/action-type';
import { AppState } from '../../Redux/app-state';
import ReactPaginate from 'react-paginate';
import './Coupons.css'
import Coupon from './Coupon';
import { useCart } from '../Context/Cart-Context';
import Menu from '../Menu/Menu';
import styled from 'styled-components';
import { useAuth } from '../Context/AuthProvider';


function Coupons() {

  let dispatch = useDispatch();

  const { isLoggedIn } = useCart()

  const { tokenDecoded } = useAuth()

  let couponsByPage: ICoupon[] = useSelector((state: AppState) => state.couponsByPage)

  let coupons: ICoupon[] = useSelector((state: AppState) => state.coupons)

  let companyId = JSON.parse(localStorage.getItem("companyId"))

  const [pageNumber, setPageNumber] = useState<number>(0)

  dispatch({ type: ActionType.getPageNumber, payload: pageNumber })

  const couponsPerPage = 10

  let amountOfCoupons = coupons.length;

  let pageCount = tokenDecoded() === "ROLE_Company" ? Math.ceil(couponsByPage.length / couponsPerPage) : Math.ceil(coupons.length / couponsPerPage)

  couponsByPage = tokenDecoded() === "ROLE_Company" ?
    coupons.filter((coupon => coupon.companyId === companyId))
    : couponsByPage;


  async function setItemsPerPage(pageNumber: number, couponsPerPage: number) {
    axios.get(`http://localhost:8080/coupons/pages/${pageNumber}/${couponsPerPage}`)
      .then(response => {
        let serverResponse = response.data
        dispatch({ type: ActionType.getCouponsByPage, payload: serverResponse })
      }
      )
      .catch(error => alert(error.message));
  }

  let changePage = ({ selected }: { selected: number }): void => {
    setPageNumber(selected)
  }


  useEffect(() => {
    localStorage.removeItem("EditMode")
    setItemsPerPage(pageNumber, couponsPerPage)
  }, [pageNumber])


  useEffect(() => {
  }, [isLoggedIn])

  useEffect(() => {

  }, [amountOfCoupons])

  return (
    <div>
      <div className='main_conatainer'>
        <Menu />
        <div className='coupons_container'>
          <>
            {couponsByPage.map((coupon: ICoupon) => {
              return <Coupon key={coupon.id} coupon={coupon} />
            })}
          </>
        </div>
        <div className='pages_container'>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"pagination_buttons"}
            pageLinkClassName={"pages_buttons"}
            pageClassName={"pages_buttons"}
            previousLinkClassName={"previous_button"}
            nextLinkClassName={"next_button"}
            disabledLinkClassName={"disabled_buttons"}
            activeLinkClassName={"active_buttons"}
          />

        </div>
      </div>
    </div>
  )
}

export default Coupons