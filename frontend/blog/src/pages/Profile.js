import Navbar from "../components/Navbar";
import ProfileCard from "../components/Profile/Profile-card";
import { useParams } from "react-router-dom";
import PostList from "../components/posts/PostList";
import PostDetail from "../components/posts/PostDetail";
import PostCreate from "../components/posts/PostCreate";
import { Routes, Route } from 'react-router-dom';
import PostUpdate from "../components/posts/PostUpdate";
import useFetch from "../hooks/useFetch";

const Profile = () => {
    const {id} = useParams();
    const posts = useFetch('/blog/'+id+'/userposts/');
    return (  
        <div>
            <Navbar />

        <div className="container mt-5 fs-4">
            <div className="row">
                <ProfileCard url={'/user/profile/'+id+'/'}/>

                <div className="col-lg-8 px-5">
                <Routes>
                    <Route  exact path="/" element={<PostList posts={posts} /> }/>
                    <Route  exact path="/:blog_id" element={<PostDetail/>} />
                    <Route  exact path="/create" element={<PostCreate/>} />
                    <Route  exact path="/:blog_id/update" element={<PostUpdate/>} />
                </Routes>
                
                    
                </div>
            </div>
        </div>
    </div>


    );
}

export default Profile;