const ProfileSecurity = () => {
    return ( 

        <div className="card mb-4">
            <div className="card-header">Change Password</div>
                <div className="card-body">
                    <form>
                        
                        <div className="mb-3">
                            <label className="small mb-1" for="currentPassword">Current Password</label>
                            <input className="form-control" id="currentPassword" type="password" placeholder="Enter current password" />
                        </div>
                        
                        <div className="mb-3">
                            <label className="small mb-1" for="newPassword">New Password</label>
                            <input className="form-control" id="newPassword" type="password" placeholder="Enter new password" />
                        </div>
                        
                        <div className="mb-3">
                            <label className="small mb-1" for="confirmPassword">Confirm Password</label>
                            <input className="form-control" id="confirmPassword" type="password" placeholder="Confirm new password" />
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary" type="button">Save</button>
                        </div>
                    </form>
                </div>
        </div>

    );
}

export default ProfileSecurity;