import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
const FollowingList = () => {
    
    const {data:following, isPending, error} = useFetch("/user/profile/following")

    return ( 
    <>
    {error && <div>{ error }</div> }
    { isPending && <div>Loading...</div> }
    { following && 
        following.map((person)=>(
            
            <Link to={'profile/'+person.user_name} >
            <div className="blog-post-hor following">
                <div className="blog-post__author" key={person.id}>
                    
                    <img src={person.avatar} alt="" className="blog-post__author__avatar"  />
                    <div  className="blog-post__author-info">
                            <h4 className="blog-post__author__name">
                                {person.user_name}
                            </h4>
                            <h5 className="blog-post__author__bio">
                                {person.profession}
                            </h5>
                        </div>
                    
                </div>
                <div className="follow-btn">
                    <a href="#">Visit</a>
                </div>
            </div>
            </Link>



        ))
        

        
    }
    </> 
    );
}
 
export default FollowingList;