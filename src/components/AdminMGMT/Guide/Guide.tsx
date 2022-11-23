import React, { useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import CompaniesGuide from './CompaniesGuide'
import CouponsGuide from './CouponsGuide'
import './Guide.css'
import UsersGuide from './UsersGuide'

function Guide() {

    const [active, setActive] = useState<string>("Companies")

    let handleCompaniesClicked = () => {
        setActive("Companies")
    }
    let handleUsersClicked = () => {
        setActive("Users")
    }
    let handleCouponsClicked = () => {
        setActive("Coupons")
    }
    return (
        <div className='guide-container'>
            <div className='nav-guide'>
                <ButtonGroup className='button-group-guide'>
                    <Button variant='secondary' className='buttons-tabs-guide-companies' onClick={handleCompaniesClicked}>Companies</Button>
                    <Button variant='secondary' className='buttons-tabs-guide-users' onClick={handleUsersClicked}>Users</Button>
                    <Button variant='secondary' className='buttons-tabs-guide-coupons' onClick={handleCouponsClicked}>Coupons</Button>
                </ButtonGroup>
            </div>
            {active === "Companies" && <CompaniesGuide />}
            {active === "Users" && <UsersGuide />}
            {active === "Coupons" && <CouponsGuide />}
        </div>
    )
}

export default Guide