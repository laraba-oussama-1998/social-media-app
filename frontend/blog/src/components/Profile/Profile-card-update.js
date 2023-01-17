import { SocialIcon } from 'react-social-icons';
import { useState } from 'react';
import axiosInstance from '../../axios/authaxios';
import { selectUser, updateUser } from '../../redux/reducers/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const ProfileCardUpdate = ({username, card}) => {

    const [formData, setFormData] = useState(card);
    const dispatch = useDispatch();

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    
    const handleUpload = (e)=>{
        
        setFormData({
            ...formData,
            avatar:{ preview: URL.createObjectURL(e.target.files[0]),
                    file: e.target.files[0]}

        });
        
    }
    
    
    const handlesubmit = (e) =>{
        e.preventDefault();
        const data = Object.fromEntries(
            Object.entries(formData).map(([key, value]) => 
              // Modify key here
            [key.replace("$","_"), value]
            )
        )
        
        if (data.avatar.file === ""){
            delete data.avatar
        }else{
            data.avatar = data.avatar.file
        }
        axiosInstance.defaults.headers['content-type'] = 'multipart/form-data';
        axiosInstance.patch("/user/profile/"+username+"/",data)
        .then((res)=>{
            data.avatar = URL.createObjectURL(data.avatar)
            dispatch(updateUser(data));
            
        }).catch((err)=>{
            
            console.log(err)
        })
    }
    return ( 

        <div className="col-lg-4">
                <div className="card">
                    
                    <div className="card-body pt-2 pb-2">
                        <div className="card-body text-center">
                        <div className="thumb-lg member-thumb mx-auto ">
                            <img src={formData.avatar.preview}
                                className="rounded-circle img-thumbnail"
                                height="150"
                                width="150"
                                alt="profile-image"/>
                        </div>
                        <div className="fs-4 my-3  btn btn-outline-primary text-center">
                            <input type="file" id="myFile" name="avatar"  className='file-input'
                            
                            onChange={handleUpload}/>
                            Upload New image
                        </div>

                        </div>
                        <div className="mb-3">
                            <label className="small mb-1"  htmlFor="inputFacebookLink">Facebook link</label>
                            <input className="form-control field-size" id="inputFacebookLink" type="text"
                            name='facebook$link'
                            value={formData.facebook$link}
                            onChange={handleChange}
                            placeholder="Enter your facebook link"  />
                        </div>

                        <div className="mb-3">
                            <label className="small mb-1"  htmlFor="inputInstagramLink">instagram link</label>
                            <input className="form-control field-size" id="inputInstagramLink" type="text" 
                            name="instagram$link"
                            value={formData.instagram$link}
                            onChange={handleChange}
                            placeholder="Enter your instgram link"  />
                        </div>

                        <div className="mb-3">
                            <label className="small mb-1"  htmlFor="inputTwitterLink">twitter link</label>
                            <input className="form-control field-size" id="inputTwitterLink" type="text" 
                            name='twitter$link'
                            value={formData.twitter$link}
                            onChange={handleChange}
                            placeholder="Enter your username"  />
                        </div>
                            

                        <div className='text-center'>
                            <button type="button" 
                            className="btn btn-primary fs-3 my-3 btn-rounded waves-effect w-md waves-light"
                            onClick={handlesubmit}>Save changes</button>
                        </div>
                        </div>
                    </div>
                </div>
            

     );
}
 
export default ProfileCardUpdate;