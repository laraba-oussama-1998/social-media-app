import Navbar from "../components/Navbar";
import ProfileCard from "../components/Profile/Profile-card";
import ProfileSecurity from "../components/Profile/Profile-security";
import ProfileInfo from "../components/Profile/Profile-info";

const Profile = () => {
    return (  
        <div>
            <Navbar />

        <div className="container mt-5">
            <div className="row">
                <ProfileCard />

                <div className="col-lg-8">
                    <div className="card">
                        <div class="card-header">
                            Featured
                        </div>
                        <div className="card-body pt-2 pb-2">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-info" type="button" role="tab" aria-controls="profile" aria-selected="false">Profile</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#security" type="button" role="tab" aria-controls="contact" aria-selected="false">Security</button>
                                </li>
                            </ul>
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">...</div>
                                <div class="tab-pane fade" id="profile-info" role="tabpanel" aria-labelledby="profile-tab">
                                    <ProfileInfo />
                                </div>
                                <div class="tab-pane fade" id="security" role="tabpanel" aria-labelledby="contact-tab">
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

export default Profile;