import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { ActionType } from '../../Redux/action-type';
import './Modal.css'


function Modal() {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    let dispatch = useDispatch()

    let handleClick = () => {
        setIsOpen(false)
        dispatch({ type: ActionType.openModal, payload: isOpen })
    }

    let navigate = useNavigate()

    let onLogInClick = () => {
        setIsOpen(false)
        dispatch({ type: ActionType.openModal, payload: isOpen })
        navigate("/login")
    }

    let onSignUpClick = () => {
        setIsOpen(false)
        dispatch({ type: ActionType.openModal, payload: isOpen })
        navigate("/signup")
    }


    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button onClick={handleClick}>X</button>
                </div>
                <div className="title">
                    <h1>Please Log In to buy this product</h1>
                </div>
                <div className="body">
                    <p>If you are not a member yet, please sign up</p>
                </div>
                <div className="footer_of_modal">
                    <button onClick={onLogInClick}>Log In</button>
                    <button onClick={onSignUpClick} id="cancelBtn">Sign Up</button>
                </div>
            </div>
        </div>
        // <div>
        //     <h1>Not a memeber yet?</h1>
        //     <div className='link'>
        //         <Link to={"signup"} style={{ fontSize: 20 }}>Sign Up</Link>
        //     </div>
        //     <h1>for free!</h1>
        //     <h5>Already a member?&ensp;
        //         <Link to={"login"}>Log in here</Link>
        //     </h5>
        //     <button onClick={closePopup} className='sign_up_later' >I will sign up later</button>
        // </div>
    );

}

export default Modal

