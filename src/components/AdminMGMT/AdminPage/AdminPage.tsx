import React, { useState } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import './AdminPage.css'
import UsersMGMT from '../UserMGMT/UsersMGMT'
import CompaniesMGMT from '../CompaniesMGMT/CompaniesMGMT'

function AdminPage() {

    const [active, setActive] = useState<string>("Companies")

    let handleCompaniesClicked = () => {
        setActive("Companies")
    }
    let handleUsersClicked = () => {
        setActive("Users")
    }
    return (
        <div className='admin-page-container'>
            <div className='buttons-selection'>
                <ButtonGroup className='button-tabs-companies-users-group' size="lg" >
                    <Button variant='secondary' className='button-tabs-companies' onClick={handleCompaniesClicked}>Companies</Button>
                    <Button variant='secondary' className='button-tabs-users' onClick={handleUsersClicked}>Users</Button>
                </ButtonGroup>
            </div>
            {active === "Companies" && <CompaniesMGMT />}
            {active === "Users" && <UsersMGMT />}

        </div>
    )
}

export default AdminPage