
import Navbar from "../components/Navbar";
import ProfileSecurity from "../components/Profile/Profile-security";
import ProfileInfo from "../components/Profile/Profile-info";
import ProfileCardUpdate from "../components/Profile/Profile-card-update";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/reducers/auth/authSlice";

const ProfileUpdate = () => {
    const user = useSelector(selectUser);
    
    const card = {
        avatar:{ preview: user.avatar, file: ""  },
		facebook$link: user.facebook_link,
		instagram$link: user.instagram_link,
        twitter$link: user.twitter_link,
	};

    const profile_info = {
        username: user.user.user_name,
        firstname: user.user.first_name,
        email: user.user.email,
        about: user.about,
        address: user.adresse,
        mobile: user.mobile,
        birthday: user.birthday
    }

    
    return ( 

        <div>
            <Navbar />

            <div className="container mt-5 fs-4">
            <div className="row">
                <ProfileCardUpdate username={user.user.user_name} card={card}/>

                <div className="col-lg-8">
                    <div className="card">
                        <div className="card-header">
                            Featured
                        </div>
                        <div className="card-body pt-2 pb-2">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-info" type="button" role="tab" aria-controls="profile" aria-selected="false">Profile</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#security" type="button" role="tab" aria-controls="contact" aria-selected="false">Security</button>
                                </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="profile-info" role="tabpanel" aria-labelledby="profile-tab">
                                    <ProfileInfo profile={profile_info}/>
                                </div>
                                <div className="tab-pane fade" id="security" role="tabpanel" aria-labelledby="contact-tab">
                                    <ProfileSecurity />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    );
}

export default ProfileUpdate;