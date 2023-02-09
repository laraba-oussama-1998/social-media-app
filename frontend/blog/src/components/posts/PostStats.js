import {FaRegComment} from 'react-icons/fa';
import {FiHeart} from 'react-icons/fi';
const PostStats = ({post, handleLikeClick}) => {
    return ( <>
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
                        <FiHeart className="post-icon" fill={(post.is_liked? "green":"transparent")} />
                        <span className="icon-text"> Like</span>
                    </div>
                    
                    
                    <div className="post-icons-section">
                        <FaRegComment className="post-icon"  />
                        <span className="icon-text"> Comment</span>
                    </div>
                </div>
    </> );
}
 
export default PostStats;