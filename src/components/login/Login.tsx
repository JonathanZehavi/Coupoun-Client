import { useContext, useState } from 'react'
import axios from 'axios';
import "./Login.css";
import { ConnectContext } from '../Context/Socket-Container';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ActionType } from '../../Redux/action-type';
import LoadingSpinner from './LoadingSpinner';
import { useCart } from '../Context/Cart-Container';


function Login() {

    let dispatch = useDispatch();
    let navigate = useNavigate();

    const {logIn}:any = useCart()

    // let userState: IUser = useSelector((state: AppState) => state.user)
    
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [user, setUser] = useState({
        username: "",
        password: "",
        role: ""
    });
    let username = user.username
    let password = user.password

    const [error, setError] = useState<string>("")

    let connect = useContext(ConnectContext);

    let onChange = ((e: any) => {
        setError("")
        setIsLoading(false)

        setUser({ ...user, [e.target.name]: e.target.value })

        if (e.target.name === "username") {
            setError("")
        }
        if (e.target.name === "password") {
            setError("")
        }
    })

    const onLoginClicked = async (e: any) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            const response = await axios.post("http://localhost:8080/users/login", { username, password });
            const serverResponse = response.data;
            dispatch({ type: ActionType.login, payload: serverResponse })
            localStorage.setItem("companyId", JSON.stringify(serverResponse.companyId))      
            let token = 'Bearer ' + serverResponse.token;
            axios.defaults.headers.common['Authorization'] = token;
            localStorage.setItem('token', token);
            localStorage.setItem('userRole', serverResponse.role)
            // connect(token);
            setIsLoading(false)
            logIn()
            dispatch({ type: ActionType.isLogedIn, payload: true })
            navigate('/');  
        }
        catch (error: any) {
            setIsLoading(false)
            setError("Username or Password is incorrect")
        }
    }

    return (
        <div>
            <div className='full_screen_login'>
                <div className='container_login'>
                    <div className='title_login_container'>
                        <h1 className='title_login'>Login</h1>
                    </div>
                    <form className='form' onSubmit={onLoginClicked}>
                        <div className='details'>
                            <label aria-required={true} htmlFor="email">Email*</label>
                            <input id='1' name='username' required={true} type="email" placeholder='Email' onChange={onChange} />
                        </div>
                        <div className='details'>
                            <label htmlFor="password">Password*</label>
                            <input id='2' name='password' type="password" placeholder='Password' onChange={onChange} />
                        </div>
                        <div className='error_container'>
                            <span className='error'>{error}</span>
                        </div>
                        <div className='submit_button_container'>
                            <button className='submit_login' type='submit' disabled={isLoading}>Log In</button>
                        </div>
                        <div className='loading_spinner'>
                            {isLoading && <LoadingSpinner />}
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}


export default Login