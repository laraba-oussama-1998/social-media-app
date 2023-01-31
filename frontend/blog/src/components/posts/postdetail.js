import UseFetch from "../../hooks/useFetch";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import {FaRegComment, FaRegHeart} from 'react-icons/fa';
import './post.css';
import axiosInstance from "../../axios/authaxios";

const PostDetail = () => {

    const {blog_id} =  useParams();
    //const [post, setPost] = useState({});
    const {data:post, setDataValue, error, isPending} =   UseFetch("/blog/"+blog_id);
    

    const handleLikeClick = (e) =>{
        e.preventDefault();
        
        if(post.is_liked){
            e.target.parentElement.style.color = "black";

            axiosInstance.post('/blog/'+post.id+'/like',{"action": "unlike"})
            .then((res)=>{
                setDataValue({...post, likes_count: post.likes_count-1,
                is_liked: false});

            console.log(res.data)
            }).catch((err)=>{
                console.log(err);
            })
            
        }else{
            
            e.target.parentElement.style.color = "#198754";

            axiosInstance.post('/blog/'+post.id+'/like',{"action": "like"})
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

                    <div className="post-category">
                    <a href="#" className="post-btn">{post.category}</a>
                    <a href="#" className="post-btn">4 min read</a>
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
                
            <div className="post-stats">
                <span>
                    {post.likes_count} likes
                </span>
                <span>
                    100 Comment
                </span>
            </div>
            <div className="devider"></div>
                <div className="post-action">
                    <div className={"post-icons-section"+ (post.is_liked? "-active":"")} onClick={handleLikeClick}>
                        <FaRegHeart className="post-icon" />
                        <span className="icon-text"> Like</span>
                    </div>
                    
                    
                    <div className="post-icons-section">
                        <FaRegComment className="post-icon"  />
                        <span className="icon-text"> Comment</span>
                    </div>
                </div>
            </div>
            <div className="devider"></div>
        </>}
            
        </div>
        
        </>
    );
}
 
export default PostDetail;