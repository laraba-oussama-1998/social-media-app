import { Link } from "react-router-dom";
import moment from 'moment';
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/reducers/auth/authSlice";
import {FiSettings} from "react-icons/fi";
import {AiOutlineDelete} from "react-icons/ai";
import { useRef } from "react";
import DeleteModal from "./DeleteModal";

const Post = ({post, handleDelete}) => {
    const base_url = "http://localhost:8000"
    const now = new Date();
    const {user_name} = useSelector(selectUser);
    const modalref = useRef(null)
    
    return ( 
        <>
        <div className="blog-post" >
            <div className="blog-post-hor">
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
                
                {user_name === post.username &&
                <div>
                    <Link className="post-icons" to={'/profile/'+post.username+'/'+post.id+'/update'}>
                        <FiSettings  size="18px" />
                    </Link>
                    <div type="button" className="post-icons"
                        onClick={(e)=>{modalref.current.style.display="block"}}>
                        <AiOutlineDelete  size="20px"/>
                    </div>
                </div>
                }
            </div>
            <Link to={'/profile/'+post.username+'/'+post.id}>
                <div className="blog-post-hor">
                    <div className="blog-post__info">
                            
                        
                            <h1 className="blog-post__title">
                                {post.title}
                            </h1>
                        
                            <p className="blog-post__text">
                            
                                {post.content}
                            
                            </p>
                        
                            
                    </div>
                    {post.image &&
                            <div className="blog-post__img">
                                <img src={post.image} alt="" />
                            </div>
                            }
                    
                </div>
            </Link>
            
                <div className="blog-post-hor">
                    <div>
                    <a href="#" className="blog-post__btn">{post.category_name}</a>
                    <a href="#" className="blog-post__btn">4 min read</a>
                    </div>
                </div>
                
            </div>
            <div className="devider"></div>
            <div ref={modalref} id="myModal" className="dalete-modal">
                <DeleteModal post_id={post.id} handleDelete={handleDelete}/>
            </div>
            
        </>
    );
}

export default Post;