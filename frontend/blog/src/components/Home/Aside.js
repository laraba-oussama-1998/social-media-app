import notebook_img from "../../media/notebook.png"
import FollowingList from "../Aside/FollowingList";
import LikedPosts from "../Aside/LikedPosts";

const Aside = () => {
    return ( 
        <div className="aside">
            <div className="note_card">
                <div className="left">
                    <h1>Get unlimited access to everything on Reader</h1>
                    <p>Plans starting at less than 1$/week.</p>
                    <a href="#">Get unlimited access</a>
                </div>
                <div className="right">
                    <img src={notebook_img} alt="" className="notebook" />
                </div>
            </div>

            
            <div >
                <h1 className="interest">People you Follow</h1>
                <FollowingList />
            </div>
            
            <div className="reading">
                <h1 className="reading-title">My Liked Posts</h1>
                <LikedPosts />
            </div>
            
        </div>
    );
}

export default Aside;