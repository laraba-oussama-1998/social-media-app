const ProfileSecurity = () => {
    return ( 

        <div className="card mb-4">
            
                <div className="card-body">
                    <form>
                        
                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="currentPassword">Current Password</label>
                            <input className="form-control field-size" id="currentPassword" type="password" placeholder="Enter current password" />
                        </div>
                        
                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="newPassword">New Password</label>
                            <input className="form-control field-size" id="newPassword" type="password" placeholder="Enter new password" />
                        </div>
                        
                        <div className="mb-3">
                            <label className="small mb-1" htmlFor="confirmPassword">Confirm Password</label>
                            <input className="form-control field-size" id="confirmPassword" type="password" placeholder="Confirm new password" />
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary fs-3 mt-3" type="button">Save</button>
                        </div>
                    </form>
                </div>
        </div>

    );
}

export default ProfileSecurity;