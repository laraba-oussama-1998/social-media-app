import useFetch from "../../hooks/useFetch";
import Post from "./Post";

const PostList = ({url}) => {
    const {data: posts, isPending, error} = useFetch(url);
    return ( 
        <>
        <div className="blogs">
        { error && <div>{ error }</div> }
        { isPending && <div>Loading...</div> }
        { posts && <>
        <div className="devider"></div>
        {posts.map(post =>(
            <Post key= {post.id} post={post}/>
        ))}
        </>}
            
        </div>
        </>
    );
}

export default PostList;


/*

<div className="devider"></div>

            <div className="blog-post">
                <div className="blog-post__info">
                    <div className="blog-post__author">
                        <img src="images/profile.jfif" alt="" className="blog-post__author__avatar" />
                        <a href="/user/<%= blog.user_name %>" className="blog-post__author-info">
                            <h3 className="blog-post__author__name">
                                user name
                            </h3>
                            <h4 className="blog-post__author__bio">Msc Networks and Embedded Systems | Siemens
                                Algeria
                            </h4>
                        </a>
                    </div>
                    <a href="/blog/<%= blog._id %>">
                        <h1 className="blog-post__title">
                            blog title
                        </h1>
                    </a>
                    <p className="blog-post__text">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis sit quas sapiente excepturi autem. Ex, accusantium obcaecati excepturi id dolor odio distinctio perspiciatis unde sed aspernatur optio eos quaerat cum!
                    </p>
                    <a href="#" className="blog-post__btn">UX Design</a>
                    <a href="#" className="blog-post__btn">4 min read</a>
                </div>
                <div className="blog-post__img">
                    <img src="images/porsche.jpg" alt="" />
                </div>
            </div>
*/