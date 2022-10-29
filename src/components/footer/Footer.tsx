import { TbBrandGithub, TbBrandLinkedin } from 'react-icons/tb'
import './Footer.css'

function Footer() {
  return (
    <div className='footer'>
      <TbBrandGithub style={{fontSize: 20}}/>
      <TbBrandLinkedin style={{ fontSize: 20 }} />
    </div>
  )
}

export default Footer