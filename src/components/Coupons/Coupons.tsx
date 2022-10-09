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



function Coupons() {


  let dispatch = useDispatch();

  let coupons: ICoupon[] = useSelector((state: AppState) => state.coupons)

  console.log(coupons);
  

  const [pageNumber, setPageNumber] = useState<number>(0)

  const couponsPerPage = 4

  const pagesVisited = pageNumber * couponsPerPage

  const pageCount = Math.ceil(coupons.length / couponsPerPage)

  const displayCoupons = coupons.slice(pagesVisited, pagesVisited + couponsPerPage)


  async function getCoupons() {
    axios.get("http://localhost:8080/coupons")
      .then(response => {
        let serverResponse = response.data
        dispatch({ type: ActionType.getAllCoupons, payload: serverResponse })
      }
      )
      .catch(error => alert(error.message));
  }


  async function setItemsPerPage(pageNumber: number, couponsPerPage: number) {
    axios.get(`http://localhost:8080/coupons/pages?pageNumber=${pageNumber}&pageSize=${couponsPerPage}`)
      .then(response => {
        let serverResponse = response.data
        dispatch({ type: ActionType.getCouponsByPage, payload: serverResponse })
      }
      )
      .catch(error => alert(error.message));
  }

  async function deleteCoupon(id: number) {
    axios.delete(`http://localhost:8080/coupons/${id}`)
      .then(response => {
        dispatch({ type: ActionType.getAllCoupons, payload: id })
      }
      )
      .catch(error => alert(error.message));
  }


  let changePage = ({ selected }: any) => {
    setPageNumber(selected)
  }

  useEffect(() => {
    getCoupons()
    setItemsPerPage(pageNumber, couponsPerPage)
  }, [])


  return (
    <div>
      <div className='main_conatainer'>
        <div className='coupons_container'>
          {displayCoupons.map((coupon: ICoupon) => {
            return <Coupon key={coupon.id} coupon={coupon} />
          })}
        </div>
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
  )
}

export default Coupons