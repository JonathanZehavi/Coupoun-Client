import { useContext, useState } from 'react'
import axios from 'axios';
import "./Login.css";
import { ConnectContext } from '../Context/Socket-Container';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { useCart } from '../Context/Cart-Context';
import { Button } from 'react-bootstrap';

function Login() {

    const { logIn, setCartItems, isLoggedIn } = useCart()

    let navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [user, setUser] = useState({
        username: "",
        password: "",
        role: ""
    });
    let username = user.username
    let password = user.password
    let role = user.role

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
            const response = await axios.post("http://localhost:8080/users/login", { username, password })
            const serverResponse = response.data;
            let token =  serverResponse.token;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}` 
            localStorage.setItem("companyId", JSON.stringify(serverResponse.companyId))
            localStorage.setItem('token', token);
            localStorage.setItem('userRole', serverResponse.role)
            localStorage.setItem('isLoggedIn', 'true')
            localStorage.setItem('userId', serverResponse.id)
            logIn()
            setCartItems([])
            // connect(token);
            navigate('/');
            setIsLoading(false)
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
                    {(isLoggedIn || localStorage.getItem("isLoggedIn")) ?
                            <div className='you-are-logged-in-message'>
                                You are already logged in
                            </div>

                            :
                                <>
                            <div className='title_login_container'>
                                <h1 className='title_login'>Login</h1>
                            </div><form className='form' onSubmit={onLoginClicked}>
                                <div className='details'>
                                    <label htmlFor="email">Email*</label>
                                    <input id='1' name='username' type="email" placeholder='Email' onChange={onChange} />
                                </div>
                                <div className='details'>
                                    <label htmlFor="password">Password*</label>
                                    <input id='2' name='password' type="password" placeholder='Password' onChange={onChange} />
                                </div>
                                <div className='error_container'>
                                    <span className='error'>{error}</span>
                                </div>
                                <div className='submit_button_container'>
                                    <Button className='button_login' style={{ fontSize: '18px', width: '120px' }} type='submit' disabled={isLoading}>Log In</Button>
                                </div>
                                <div className='loading_spinner'>
                                    {isLoading && <LoadingSpinner />}
                                </div>
                            </form>

                        </>
                    }
                </div>
            </div>
        </div >
    )
}


export default Login