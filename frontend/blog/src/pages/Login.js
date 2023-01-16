import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { SocialIcon } from 'react-social-icons';
import axiosInstance from '../axios/authaxios';
import { getUser } from '../redux/reducers/auth/authSlice';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode'

const Login = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
		e.preventDefault();

            setError('');
            axiosInstance
			.post(`token/`, {
				email: email,
				password: password,
			})
			.then((res) => {
				localStorage.setItem('access_token', res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
				axiosInstance.defaults.headers['Authorization'] =
					'JWT ' + localStorage.getItem('access_token');
                
                dispatch(getUser(jwtDecode(localStorage.getItem('access_token'))["profile"]));
                
                navigate('/');
				//console.log(res);
				//console.log(res.data);
			}).catch((err) => {
                
                setError(err.response.data.detail.concat(". check your email and password again !"))
            });
        
	};

    return ( 

        <div className='center-container'>
        
        <div className="container" >
            <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card border-0 shadow rounded-3 my-5" >
                <div className="card-body px-4 px-sm-5 py-3 py-sm-4">
                    <h5 className="card-title text-center my-3 fw-bold fs-3">Sign In</h5>

                    <form>
                    <div className="form-floating my-4">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-4">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                <div className='pass-texts'>
                    <div className="form-check my-4">
                        <input className="form-check-input" type="checkbox" value="" id="rememberPasswordCheck" />
                        <label className="form-check-label" htmlFor="rememberPasswordCheck">
                        Remember password
                        </label>
                    </div>
                    <Link className="text-center ml-4" to = "/reset-password" >
                            Forget password ?
                    </Link>
                </div>

                    { error !== "" && <div className="my-4">
                        <span className="login-error"> {error} </span>
                    </div>
                    }
                    <div className="d-grid my-4">
                        <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit" 
                        onClick={handleSubmit} >
                        Sign in</button>
                    </div>
                    <div className="container mb-2">
                        <div className="row justify-content-md-center">
                            <div className="col">
                                <hr className="my-4"/>
                            </div>
                            <div className="col-md-auto pt-3">
                                <h6> OR </h6>
                            </div>
                            <div className="col">
                                <hr className="my-4"/>
                            </div>
                        </div>
                    </div>
                    
                    </form>
                    
                    <div className='d-flex justify-content-center'>
                        <div className='px-2'>
                            <button className="btn" >
                                <SocialIcon network="facebook" style={{ height: 50, width: 50 }}/>
                            </button>
                        </div>
                        <div className='px-2'>
                            <button className="btn" >
                                <SocialIcon network="google" style={{ height: 50, width: 50 }}/>
                            </button>
                        </div>
                    </div>

                    <p className = "text-center mt-3 ">You Don't have an account ? <Link to="/register">Sign up</Link> </p>
                    
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>

        );
}
export default Login;