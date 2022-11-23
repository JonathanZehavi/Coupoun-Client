import React from 'react'
import { Button } from 'react-bootstrap'
import { TbError404 } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import './Unautorized.css'

function Unautorized() {

    let navigate = useNavigate()

    let handleClick = () => {
        navigate("/")
    }
    return (
        <div className='unauthorized-container'>
            <div className='unauth-box'>
                <span>Page Not Found </span>
                <Button onClick={handleClick} variant='success' style={{ fontSize: "25px" }}>Go Home</Button>
            </div>
        </div >
    )
}

export default Unautorized