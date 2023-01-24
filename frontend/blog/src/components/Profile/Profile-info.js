import { useState } from "react";
import axiosInstance from '../../axios/authaxios';
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/reducers/auth/authSlice";

const ProfileInfo = ({username,profile}) => {

    const [formData, setFormData] = useState(profile);
    const dispatch = useDispatch()
    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    
    
    const handleSubmit = (e)=>{
        e.preventDefault();

        const data = {...formData, user:{first_name: formData.firstname,
            last_name:formData.lastname}};
        delete data.lastname;
        delete data.firstname;

        axiosInstance.patch("/user/profile/"+username+"/", data)
        .then((res)=>{
            dispatch(updateUser(data));
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    }
    return ( 

        <div className="card mb-4">
            
                <div className="card-body">

                <form>
                        
                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-6">
                                <label className="small mb-1"  htmlFor="inputFirstname">First name</label>
                                <input className="form-control field-size" id="inputFirstname" type="text"
                                required
                                name="firstname"
                                value={formData.firstname}
                                onChange={handleChange}
                                placeholder="Enter your firstname"  />
                            </div>
                            
                            <div className="col-md-6">
                                <label className="small mb-1"  htmlFor="inputLastName">Last name</label>
                                <input className="form-control field-size" id="inputLastName" type="text"
                                name="lastname"
                                value={formData.lastname}
                                onChange={handleChange}
                                placeholder="Enter your last name" />
                            </div>
                        </div>
                        

                        <div className="row gx-3 mb-3">
                            
                            <div className="col-md-6">
                                <label className="small mb-1"  htmlFor="inputProfession">Profession</label>
                                <input className="form-control field-size" id="inputProfession" type="text"
                                name="profession"
                                value={formData.profession}
                                onChange={handleChange}
                                placeholder="type your profession"  />
                            </div>

                            <div className="col-md-6">
                                <label className="small mb-1"  htmlFor="inputAdresse">Address</label>
                                <input className="form-control field-size" id="inputAdresse" type="text"
                                required
                                name="adresse"
                                value={formData.adresse}
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