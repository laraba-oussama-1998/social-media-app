import useFetch from "../../hooks/useFetch";
import Post from "./Post";
import axiosInstance from "../../axios/authaxios";
import { useRef } from "react";

const PostList = ({posts:blog}) => {
    const {data: posts,setDataValue: setPosts, isPending, error} = {...blog};

    const alert_ref = useRef(null)
    const handleDelete = (post_id)=>{
        
        
        axiosInstance.delete('/blog/'+post_id+"/")
        .then((res)=>{
            const filtered_posts = posts.filter(obj => {
                return obj.id !== post_id;
            });
            setPosts(filtered_posts);
            alert_ref.current.style.display = "block"
            console.log("deleted successfuly");
            setTimeout(()=> {
                alert_ref.current.style.display = "none"
            },3000)
            
        })
        .catch((err)=>{console.log(err)})
        
    }
    return ( 
        <>
        <div className="blogs">
        { error && <div>{ error }</div> }
        { isPending && <div>Loading...</div> }
        { posts && <>
        <div className="devider"></div>
        {posts.map(post =>(
            <Post handleDelete={handleDelete} key= {post.id} post={post}/>
        ))}
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