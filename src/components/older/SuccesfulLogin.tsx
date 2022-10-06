import React from 'react'
import { useNavigate } from 'react-router-dom';


function SuccesfulLogin () {

    let navigate = useNavigate()

    setTimeout(() => {
        navigate('/members-page')
    }, 2000)


    return (
        <div className='full_screen'>
            <div className='container'>
                <div className='title'>
                    Welcome back!
                    <br />
                    You will be redirected immediately
                </div>
            </div>

        </div>
    )
}

export default SuccesfulLogin