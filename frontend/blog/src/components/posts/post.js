import { Link } from "react-router-dom";
import moment from 'moment';


const Post = ({post}) => {
    const base_url = "http://localhost:8000"
    const now = new Date();
    return ( 
        <>
        <div className="blog-post" >
                <div className="blog-post__info">
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
                    <Link to={'/profile/'+post.username+'/'+post.id}>
                        <h1 className="blog-post__title">
                            {post.title}
                        </h1>
                    
                        <p className="blog-post__text">
                        
                            {post.content}
                        
                        </p>
                    </Link>
                    <a href="#" className="blog-post__btn">{post.category}</a>
                    <a href="#" className="blog-post__btn">4 min read</a>
                </div>
                {post.image &&
                <div className="blog-post__img">
                    <img src={post.image} alt="" />
                </div>
                }
            </div>
            <div className="devider"></div>
        </>
     );
}
 
export default Post;