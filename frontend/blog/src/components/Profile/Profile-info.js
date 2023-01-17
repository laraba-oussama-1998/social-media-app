import { useState } from "react";
import axiosInstance from '../../axios/authaxios';

const ProfileInfo = ({profile}) => {

    const [formData, setFormData] = useState(profile);

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        axiosInstance.put("/user/profile/"+formData.username+"/", formData)
    }
    return ( 

        <div className="card mb-4">
            
                <div className="card-body">

                <form>
                        
                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-6">
                                <label className="small mb-1"  htmlFor="inputUsername">Username</label>
                                <input className="form-control field-size" id="inputUsername" type="text"
                                required
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter your username"  />
                            </div>
                            
                            <div className="col-md-6">
                                <label className="small mb-1"  htmlFor="inputFirstName">First name</label>
                                <input className="form-control field-size" id="inputFirstName" type="text"
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                placeholder="Enter your first name" />
                            </div>
                        </div>
                        

                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-6">
                                <label className="small mb-1"  htmlFor="inputEmail">Email</label>
                                <input className="form-control field-size" id="inputAddress" type="email"
                                required
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="type your email"  />
                            </div>

                            <div className="col-md-6">
                                <label className="small mb-1"  htmlFor="inputAddress">Address</label>
                                <input className="form-control field-size" id="inputAddress" type="text"
                                required
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="type your address"  />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="small mb-1"  htmlFor="inputAbout">About</label>
                            <textarea className="form-control field-size" id="inputAbout" type="text"
                            required
                            name="about"
                            value={formData.about}
                            onChange={handleChange}
                            placeholder="about"  />
                        </div>
                        
                        
                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-6">
                                <label className="small mb-1"  htmlFor="inputMobile">Mobile</label>
                                <input className="form-control field-size" id="inputMobile" type="text"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                placeholder="Enter your mobile number" />
                            </div>

                            <div className="col-md-6">
                                <label className="small mb-1"  htmlFor="inputBirthday">Birthday</label>
                                <input className="form-control field-size" id="inputBirthday" type="date"
                                name="birthday"
                                value={formData.birthday}
                                onChange={handleChange} 
                                placeholder="Enter your birthday" />
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <button className="btn btn-primary fs-3 my-3" type="button"
                            onClick={handleSubmit}>Save changes</button>
                        </div>
                    </form>

                </div>
        </div>
        
    );
}
 
export default ProfileInfo;