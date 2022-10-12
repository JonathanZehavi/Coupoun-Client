import  {AiFillFacebook, AiFillGithub, AiFillInstagram, AiFillLinkedin} from 'react-icons/ai'
import { TbBrandGithub, TbBrandInstagram, TbBrandFacebook, TbBrandLinkedin } from 'react-icons/tb'
import './Footer.css'

function Footer() {
  return (
    <div className='footer'>
      <TbBrandGithub style={{fontSize: 40}}/>
      <TbBrandInstagram style={{ fontSize: 40 }} />
      <TbBrandFacebook style={{ fontSize: 40 }} />
      <TbBrandLinkedin style={{ fontSize: 40 }} />
    </div>
  )
}

export default Footer