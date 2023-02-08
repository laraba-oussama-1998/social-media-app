import UseFetch from "../../hooks/useFetch";
import axiosInstance from "../../axios/authaxios";
import { useNavigate, useParams } from "react-router-dom";
import CreateFrom from "./CreateForm";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducers/auth/authSlice";
import { useEffect, useRef } from "react";
const PostUpdate = () => {

    const {blog_id} =  useParams();
    const alert_ref = useRef(null);
    const navigate = useNavigate();
    const user_name = useSelector(selectUser).user_name;
    //const [post, setPost] = useState({});
    const {data:post, setDataValue, error, isPending} =  UseFetch("/blog/"+blog_id);
    
    
    useEffect(()=>{alert_ref.current.style.display = "none"},[]);
    
    const handleSubmit = (data) =>{
        if (data.image.file === ""){
            delete data.image
        }else{
            data.image = data.image.file
        }
        const post_id = data.id
        data = {author:data.author,
            title:data.title,
            content:data.content,
            image: data.image, 
            category:data.category, 
            status:data.status}
    
    axiosInstance.defaults.headers['content-type'] = 'multipart/form-data';
    axiosInstance.put("blog/"+post_id+"/",data)
    .then((res)=>{
        alert_ref.current.style.display = "block"
            setTimeout(() => {
                alert_ref.current.style.display = "none"
                console.log(res)
                navigate('/');
            }, 3000);
    })
    .catch((err)=>console.log(err))

    }
    
    
    return ( 
        <>
        <div className="alert alert-success" ref={alert_ref}>
            <strong>Success!</strong> The post have been created successfuly.
        </div>
        { error && <div>{ error }</div> }
        { isPending && <div>Loading...</div> }
        { post && post.username === user_name &&<>
            
            
            <CreateFrom post={post} setPost={setDataValue} handleSubmit={handleSubmit}/>
            
            </>
        }
        { post && post.username !== user_name &&<>
            <div> You can't update another person's data</div>
            </>
        }
        </>
    );
    }
 
export default PostUpdate;