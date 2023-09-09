import {Link, useNavigate} from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';
import { useState } from 'react';
import axios from 'axios';
import axiosConfig from '../axios/axios';
import axiosInstance from '../axios/authaxios';
import { getUser }  from '../redux/reducers/auth/authSlice';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';


const Register = () => {

    const dispatch = useDispatch();
    const baseURL = axiosConfig.baseURL;
    const navigate = useNavigate();
    const initialFormData = Object.freeze({
        username: '',
		email: '',
		password: '',
        confirm_password: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e) => {
		updateFormData({
			...formData,
			// Trimming any whitespace
			[e.target.name]: e.target.value,
            
		});
	};

    const handleSubmit = (e) => {
		e.preventDefault();
        
            axios
			.post(baseURL+`user/register/`, {
				user_name: formData.username,
                email: formData.email,
				password: formData.password,
                confirm_password: formData.confirm_password,
			})
			.then((res) => {
                    axiosInstance
                    .post(`token/`, {
                        email: formData.email,
                        password: formData.password,
                    })
                    .then((login_res) => {
                        localStorage.setItem('access_token', login_res.data.access);
                        localStorage.setItem('refresh_token', login_res.data.refresh);
                        axiosInstance.defaults.headers['Authorization'] =
                            'JWT ' + localStorage.getItem('access_token');
                        
                        dispatch(getUser(jwtDecode(localStorage.getItem('access_token'))["profile"]));
                        navigate('/')
                        //console.log(res);
                        //console.log(res.data);
                    }).catch((logerr)=>{
                        console.log(formData.email," ",formData.password)
                    })

            }).catch((ex) =>{
                console.log(ex.response.data)
            });
    };

    return ( 
        <div className='center-login'>
        <div className="container">

            <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div className="card border-0 shadow rounded-3 my-5">
                    <div className="card-body px-4 px-sm-5 py-3 py-sm-4">
                        <h5 className="card-title text-center mb-4 fw-bold fs-3">Sign Up</h5>
                        
                        <form>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="username" placeholder="Username" 
                            name="username"
                            required
                            value={formData.username}
                            onChange={handleChange}/>
                            <label htmlFor="floatingInput">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}/>
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange} />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>
                        <div className="form-floating mb-5">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                            name="confirm_password"
                            required
                            value={formData.confirm_passsword}
                            onChange={handleChange}
                            />
                            <label htmlFor="floatingPassword">Confirm Password</label>
                        </div>

                        <div className="d-grid mb-4">
                            <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit"
                            onClick={handleSubmit}>
                            Sign up</button>
                        </div>
                        <div className="container">
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
                        
                        <p className = "text-center mt-3 ">You have an account ? <Link to="/login">Sign in</Link> </p>
                        
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>

        );
}
export default Register;