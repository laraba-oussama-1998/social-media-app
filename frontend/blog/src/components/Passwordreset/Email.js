import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useRef } from 'react';
import { baseURL } from '../../axios/axios';
import axios from 'axios'
const Email = ({alert}) => {
    

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const url = baseURL+"password_reset/";
    const handleSubmit = (e) =>{
        e.preventDefault();
        
        axios.
        post(url,{email : email})
        .then((res)=>{
            
            alert.current.style.display = "flex";

            setTimeout(() => { 
                alert.current.style.display = "none";
                navigate('/');},3000);

        })
        .catch((err)=>{
        
        setError(err.response.data.email)
    });
    }
    
    return ( 
        <>
        
        <div className='Reset-password-form'>
            <label htmlFor="email" className='email-label'>Email address</label>
            <input type="text" name='email' className='email-input' id='email' placeholder='Email address'
            required 
            value={email}
            onChange={(e) => {setEmail(e.target.value); setError('')}}></input>
            { error !== "" && <div className="my-2">
                        <span className="login-error"> {error} </span>
                    </div>
                    }
            <button className="email-send-btn btn-login" type="submit" 
                onClick={handleSubmit} >
                Continue</button>
        </div>
        </>
    );
}

export default Email;