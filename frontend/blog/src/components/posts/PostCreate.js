
import axiosInstance from "../../axios/authaxios";
import CreateFrom from "./CreateForm";
import { useState , useRef, useEffect} from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducers/auth/authSlice";
import { useNavigate } from "react-router-dom";

const PostCreate = () => {
    const user_id = useSelector(selectUser).user.id
    const alert_ref =useRef(null)
    const navigate = useNavigate()
    useEffect(() => {
        alert_ref.current.style.display = "none"
    },[])
    const handleSubmit = (data) =>{
        
        if (data.image.file === ""){
            delete data.image
        }else{
            data.image = data.image.file
        }
        
        console.log(data)
        
        axiosInstance.defaults.headers['content-type'] = 'multipart/form-data';
        axiosInstance.post('blog/', data)
        .then((res) => {
            alert_ref.current.style.display = "block"
            setTimeout(() => {
                alert_ref.current.style.display = "none"
                console.log(res)
                navigate('/');
            }, 3000);
            
        })
        .catch((err) => console.log(err))
        
    }
    
    const [post, setPost] = useState({author:user_id,
                                    title:"",
                                    content:"",
                                    image:"", 
                                    category:"", 
                                    status:"draft"})
    return ( 
        <>
            <div className="alert alert-success" ref={alert_ref}>
                <strong>Success!</strong> The post have been created successfuly.
            </div>
        <CreateFrom post={post}
                    setPost={setPost}
                    create={true}
                    handleSubmit={handleSubmit}/>
        </>
    );
}

export default PostCreate;