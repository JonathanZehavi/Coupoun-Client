import React from 'react'
import  {AiFillFacebook, AiFillGithub, AiFillInstagram, AiFillLinkedin} from 'react-icons/ai'
import './Footer.css'

function Footer() {
  return (
    <div className='footer'>
      <AiFillGithub style={{fontSize: 40}}/>
      <AiFillLinkedin style={{ fontSize: 40 }} />
      <AiFillFacebook style={{ fontSize: 40 }} />
      <AiFillInstagram style={{ fontSize: 40 }} />
    </div>
  )
}

export default Footer