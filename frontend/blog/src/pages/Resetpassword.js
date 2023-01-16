import image from '../media/Resetpassword.svg'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useRef } from 'react';
import Emailfield from '../components/Passwordreset/Email'
import Passwordfield from '../components/Passwordreset/Password'

const Resetpassword = () => {
    const { token } = useParams();
    const alertRef = useRef(0)
    
    return ( <>
        
        <div className='center-container'>
            <div className="alert" ref={alertRef}>
                The email have sent seccussfuly please go to the link and change your password
            </div>
            <div className="Reset-password-card">
                <img className="reset-password-image" src={image} alt="" />
                <h1>Forgot Password</h1>
                <p className='explanation'>Enter the email address asociated
                with your account and we'll send you a link to reset your password.</p>
                { !token && <Emailfield alert= {alertRef}/>}
                { token && <Passwordfield token= {token} alert= {alertRef}/>}
                
                <Link className='link' to='/login'>Back to login </Link>
                
            </div>
        </div>
            </> );
}

export default Resetpassword;