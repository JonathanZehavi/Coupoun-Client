import { TbBrandGithub, TbBrandLinkedin } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {
  return (
    <div className='footer'>
      <a href="https://github.com/JonathanZehavi" target='_blank'><TbBrandGithub style={{ fontSize: 20 }} /></a>
      <a href="https://www.linkedin.com/in/jonathan-zehavi/" target='_blank'> <TbBrandLinkedin style={{ fontSize: 20 }} /></a>

    </div>
  )
}

export default Footer