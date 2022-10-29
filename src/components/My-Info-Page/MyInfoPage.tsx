import { Card } from 'react-bootstrap'
import { FaUserCircle } from 'react-icons/fa'
import './MyInfoPage.css'
import CompanyInfo from './CompanyInfo';
import CustomerInfo from './CustomerInfo';
import AdminInfo from './AdminInfo';

function MyInfoPage() {

  return (
    <div className='my-info-container'>
      <Card className='card-my-info'>
        <Card.Body>
          <Card.Title >
            <div className='card-my-info-title'>
              <FaUserCircle style={{ margin: '10px' }} />
              My Info
            </div>
          </Card.Title>
          {localStorage.getItem("userRole") === 'Admin' && <AdminInfo />}
          {localStorage.getItem("userRole") === 'Company' && <CompanyInfo />}
          {localStorage.getItem("userRole") === 'Customer' && <CustomerInfo />}
        </Card.Body>
      </Card>




    </div>
  )
}

export default MyInfoPage