import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { baseURL } from '../../axios/axios';
import axios from 'axios'


const Password = (props) => {

    const navigate = useNavigate()
    const [password, setPassword] = useState('');
    const [error, setError] = useState("")
    const url = baseURL+"password_reset/confirm/?token="+props.token;
    
    const handleSubmit = (e) =>{
        e.preventDefault();

        axios.post(url,{
            token: props.token,
            password: password 
        }
        ).then((res)=>{
            props.alert.current.innerHTML = "The password have been changed succefully"
            props.alert.current.style.display = "flex";

            setTimeout(() => {
                props.alert.current.style.display = "none";
                navigate('/login');},3000);
        }
        ).catch((err)=>{
            setError(err.response.data.password)
        })
    }

    return ( 
        <>
        <div className='Reset-password-form'>
            <label htmlFor="password" className='email-label'>Enter The New Password</label>
            <input type="password" name='email' className='email-input' id='password' placeholder='Password'
            required 
            value={password}
            onChange={(e) => {setPassword(e.target.value); setError('')}}></input>
            { error !== "" && <div className="my-2">
                        <span className="login-error"> {error} </span>
                    </div>
                    }
            <button className="email-send-btn btn-login" type="submit" 
                onClick={handleSubmit} >
                Change</button>
        </div>
        </>
    );
}
 
export default Password;