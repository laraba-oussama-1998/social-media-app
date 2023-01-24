import Navbar from "../components/Navbar";
import ProfileCard from "../components/Profile/Profile-card";
import ProfileSecurity from "../components/Profile/Profile-security";
import ProfileInfo from "../components/Profile/Profile-info";
import UseFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";
import PostList from "../components/posts/postlist";

const Profile = () => {
    const {id} = useParams();
    
    return (  
        <div>
            <Navbar />

        <div className="container mt-5 fs-4">
            <div className="row">
                <ProfileCard />

                <div className="col-lg-8 px-5">
                    
                    <PostList url={'/blog/'+id+'/userposts/'}/>
                    
                </div>
            </div>
        </div>
    </div>


    );
}

export default Profile;