import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { ActionType } from '../../Redux/action-type'
import './SingleCompanyPage.css'

function SingleCompanyPage() {

  let dispatch = useDispatch()
  let navigate = useNavigate()

  // let { id } = useParams()

  async function getCompanyById(id: number) {
    axios.get(`http://localhost:8080/companies/${id}`)
      .then(response => {
        let serverResponse = response.data
        dispatch({ type: ActionType.getCompanyById, payload: serverResponse })
      }).catch(error => alert(error.message))
  }


  useEffect(() => {

  }, [])

  return (
    <div>

    </div>
  )
}

export default SingleCompanyPage