

import { SocialIcon } from 'react-social-icons';

const ProfileCard = () => {
    return ( 

    
        <div className="col-lg-4">
                <div className="text-center card">
                    <div className="card-body pt-2 pb-2">
                        <div className="thumb-lg member-thumb mx-auto">
                            <img src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                className="rounded-circle img-thumbnail"
                                height="150"
                                width="150"
                                alt="profile-image"/></div>
                        <div className="mt-3">

                            <h4>Freddie J. Plourde</h4>
                            <p className="text-muted">@Founder <span>| </span><span><a href="#" className="text-pink">websitename.com</a></span></p>
                        </div>

                        <ul className="social-links list-inline mt-4">
                            <li className="list-inline-item mx-3"><a title="" data-placement="top" data-toggle="tooltip" className="tooltips" href="" data-original-title="Facebook"><SocialIcon network="facebook" style={{ height: 40, width: 40 }}/></a></li>
                            <li className="list-inline-item mx-3"><a title="" data-placement="top" data-toggle="tooltip" className="tooltips" href="" data-original-title="Twitter"><SocialIcon network="instagram" style={{ height: 40, width: 40 }}/></a></li>
                            <li className="list-inline-item mx-3"><a title="" data-placement="top" data-toggle="tooltip" className="tooltips" href="" data-original-title="Skype"><SocialIcon network="twitter" style={{ height: 40, width: 40 }}/></a></li>
                        </ul>

                        <button type="button" className="btn btn-primary fs-3 m-3 btn-rounded waves-effect w-md waves-light">Follow</button>
                        <div className="my-4">
                            <div className="row">
                                <div className="col-4 border-end border-2">
                                
                                    <div className="m-2">
                                        
                                        <h4>2563</h4>
                                        <p className="mb-0 text-muted">Followers</p>
                                        
                                    </div>
                                
                                </div>
                                <div className="col-4 border-end border-2">
                                    <div className="m-2">
                                        <h4>6952</h4>
                                        <p className="mb-0 text-muted">Following</p>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="m-2">
                                        <h4>1125</h4>
                                        <p className="mb-0 text-muted">Posts</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

);
}

export default ProfileCard;