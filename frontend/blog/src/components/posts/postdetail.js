import UseFetch from "../../hooks/useFetch";
import { useState, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import moment from "moment";
import {AiOutlineDelete} from "react-icons/ai";
import {FiSettings} from 'react-icons/fi';
import './post.css';
import axiosInstance from "../../axios/authaxios";
import { selectUser } from "../../redux/reducers/auth/authSlice";
import { useSelector } from "react-redux";
import DeleteModal from "./DeleteModal";
import PostStats from "./PostStats";


const PostDetail = () => {

    const {blog_id} =  useParams();
    const navigate = useNavigate();
    //const [post, setPost] = useState({});
    const {data:post, setDataValue, error, isPending} =   UseFetch("/blog/"+blog_id);
    const {user_name} = useSelector(selectUser);
    const modalref = useRef(null);
    const alert_ref = useRef(null);

    const handleDelete = (post_id) =>{
        alert_ref.current.style.display = "block"
            console.log("deleted successfuly");
            
        
        axiosInstance.delete('/blog/'+post_id+"/")
        .then((res)=>{
            
            setTimeout(()=> {
                alert_ref.current.style.display = "none"
                window.location.href = '/profile/'+user_name
                
            },3000)
            
            
        })
        .catch((err)=>{console.log(err)})
        

    }
    const handleLikeClick = (e) =>{
        e.preventDefault();
        
        if(post.is_liked){
            e.target.parentElement.style.color = "black";

            axiosInstance.post('/'+post.id+'/like',{"action": "unlike"})
            .then((res)=>{
                setDataValue({...post, likes_count: post.likes_count-1,
                is_liked: false});

            console.log(res.data)
            }).catch((err)=>{
                console.log(err);
            })
            
        }else{
            
            e.target.parentElement.style.color = "#198754";

            axiosInstance.post('/'+post.id+'/like',{"action": "like"})
            .then((res)=>{
                setDataValue({...post, likes_count: post.likes_count+1,
                is_liked: true});
                
                console.log(res.data)
            }).catch((err)=>{
                console.log(err);
            })
            
        }
    }

    return ( 
        <>
        <div className="blogs">
        { error && <div>{ error }</div> }
        { isPending && <div>Loading...</div> }
        { post && <>
        <div className="devider"></div>
        <div className="post-detail" >
                <div className="blog-post__info">
                    <div className="post-info">
                    <Link to={'/profile/'+post.username}>
                        <div className="blog-post__author">
                            <img src={post.avatar} alt="" className="blog-post__author__avatar" />
                            <div  className="blog-post__author-info">
                                <h4 className="blog-post__author__name">
                                    {post.username}
                                    <span className="blog-post__author__bio"> {moment(post.date).fromNow()}</span>
                                </h4>
                                <h5 className="blog-post__author__bio">
                                    {post.profession}
                                </h5>
                            </div>
                        </div>
                    </Link>
                    <div className="action-block">
                    {user_name === post.username &&
                    <div className="action">
                        <Link className="post-icons" to={'/profile/'+post.username+'/'+post.id+'/update'}>
                            <FiSettings  size="18px" />
                        </Link>
                        <div type="button" className="post-icons"
                            onClick={(e)=>{modalref.current.style.display="block"}}>
                            <AiOutlineDelete  size="20px"/>
                        </div>
                    </div>
                    }
                    <div className="post-category">
                        <span className="post-btn">{post.category_name}</span>
                        <span className="post-btn">4 min read</span>
                    </div>
                    </div>
                    </div>
                        <h1 className="post-title">
                            {post.title}
                        </h1>
                        {post.image &&
                        <div className="post-img">
                            <img src={post.image} alt="" />
                        </div>
                        }
                        <pre >
                            <p className="post-text">
                            
                                {post.content}
                            
                            </p>
                        </pre>
                    
                </div>
                
            <PostStats post={(({ likes_count, is_liked }) => ({ likes_count, is_liked }))(post)}
                handleLikeClick={handleLikeClick}/>
            </div>
            
            <div className="devider"></div>
            <div ref={modalref} id="myModal" className="dalete-modal">
                <DeleteModal post_id={post.id} handleDelete={handleDelete}/>
            </div>
        </>}
            
        </div>
        <div className="alert-modal" ref={alert_ref}>
            <div className="alert alert-success" >
                <strong>Success!</strong> The post have been deleted successfuly.
            </div>
        </div>
        </>
    );
}
 
export default PostDetail;