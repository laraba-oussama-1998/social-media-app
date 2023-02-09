import useFetch from "../../hooks/useFetch";
import moment from "moment";

const LikedPosts= () => {
    const {data:likedposts, isPending, error} = useFetch("blog/likedposts")
    return ( <>
    {error && <div>{ error }</div> }
    { isPending && <div>Loading...</div> }
    { likedposts && 
    likedposts.map(post=>(
        <div className="reading-post">
                
            {post.image && <div className="reading-post__img">
                <img src={post.image} alt="" />
            </div>
            }
            <div className="reading-post__info">
                
                <h1 className="reading-post__title">{post.title}</h1>
                <p className="reading-post__text">{post.content}</p>
                <div className="reading-post__author">
                    <img src={post.avatar} alt="" className="reading-post__author__avatar" />
                    <a className="reading-post__author-info">
                        <h3 className="reading-post__author__name">{post.username}</h3>
                        <span>.</span>
                        <h4 className="reading-post__author__date">{moment(post.date).fromNow()}</h4>
                    </a>
                </div>
            </div>
        </div>
    ))
    
    }
    </> );
}

export default LikedPosts
;