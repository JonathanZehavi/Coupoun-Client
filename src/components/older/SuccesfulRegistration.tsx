import React from 'react'
import { useNavigate } from 'react-router-dom';

function SuccesfulRegistration () {

    let navigate = useNavigate()

    setTimeout(() => {
        navigate('/members-page')
    },2000)


    return (
        <div className='full_screen'>
            <div className='container'>
                <div className='title'>
                    Registration completed!
                    <br />
                    You will be redirected immediately
                </div>
            </div>

        </div>
    )
}

export default SuccesfulRegistration