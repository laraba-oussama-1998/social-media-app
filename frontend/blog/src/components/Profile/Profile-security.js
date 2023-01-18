import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios/authaxios";

const ProfileSecurity = ({username}) => {

    const [passwords, setPasswords] = useState({"current$password": "",
                                                "new$password": "",
                                                "confirm$new$password":""});
    const navigate = useNavigate();
    const handleChange = (e) =>{
        setPasswords({...passwords,
            [e.target.name]: e.target.value});
    }
    const handlelogout = (e)=>{

        axiosInstance.
        post(`user/logout/blacklist/`, {
            refresh_token: localStorage.getItem('refresh_token'),

        }).then((res)=>{
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                navigate('/login');
            });
        
    }

    const handleSubmit = (e)=>{
        e.preventDefault();

        const data = Object.fromEntries(
            Object.entries(passwords).map(([key, value]) => 
              // Modify key here
            [key.replaceAll("$","_"), value]
            )
        )
        delete data.current$password;
        delete data.new$password;
        delete data.confirm$new$password;
        console.log(data)
        axiosInstance.put('/user/change_password/'+username+"/",data)
        .then((res)=>{
            console.log(res)
            handlelogout();
        }).catch((err)=>{
            console.log("can't logout");
        })
    }
    return ( 

        <div className="card mb-4">
            
                <div className="card-body">
                    <form>
                        
                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="currentPassword">Current Password</label>
                            <input className="form-control field-size" id="currentPassword" type="password"
                            required
                            name="current$password"
                            onChange={handleChange}
                            placeholder="Enter current password" />
                        </div>
                        
                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="newPassword">New Password</label>
                            <input className="form-control field-size" id="newPassword" type="password"
                            required
                            name="new$password"
                            onChange={handleChange}
                            placeholder="Enter new password" />
                        </div>
                        
                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="confirmPassword">Confirm Password</label>
                            <input className="form-control field-size" id="confirmPassword" type="password"
                            required
                            name="confirm$new$password"
                            onChange={handleChange} 
                            placeholder="Confirm new password" />
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary fs-3 mt-3" onClick={handleSubmit} 
                            type="button">Save</button>
                        </div>
                    </form>
                </div>
        </div>

    );
}

export default ProfileSecurity;