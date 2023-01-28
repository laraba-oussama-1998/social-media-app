import Navbar from "../components/Navbar";
import ProfileCard from "../components/Profile/Profile-card";
import { useParams } from "react-router-dom";
import PostList from "../components/posts/PostList";
import PostDetail from "../components/posts/PostDetail";
import { Routes, Route } from 'react-router-dom';

const Profile = () => {
    const {id} = useParams();
    
    return (  
        <div>
            <Navbar />

        <div className="container mt-5 fs-4">
            <div className="row">
                <ProfileCard url={'/user/profile/'+id+'/'}/>

                <div className="col-lg-8 px-5">
                <Routes>
                    <Route  exact path="/" element={<PostList url={'/blog/'+id+'/userposts/'}/>} />
                    <Route  exact path="/:blog_id" element={<PostDetail/>} />
                </Routes>
                
                    
                </div>
            </div>
        </div>
    </div>


    );
}

export default Profile;