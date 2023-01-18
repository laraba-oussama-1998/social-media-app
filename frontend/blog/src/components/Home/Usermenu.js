import { useNavigate } from 'react-router-dom';
import {FaUserAlt, FaCog, FaSignOutAlt} from 'react-icons/fa';
import axiosInstance from '../../axios/authaxios';
import { Link } from 'react-router-dom';

const Usermenu = ({user}) => {

    const navigate = useNavigate()


    const username= user.user_name,
        avatar = user.avatar;
    const handlelogout = (e)=>{

        axiosInstance.
        post(`user/logout/blacklist/`, {
			refresh_token: localStorage.getItem('refresh_token'),

		}).then((res)=>{
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                navigate('/login');
            });
		
    }
    return ( 

        <div className="dropdown nav-item d-flex align-items-center">
                <a
                className="d-flex align-items-center profile-nav-dropdown"
                id="navbarDropdownMenuAvatar"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                >
                    
                    <div className="d-inline p-1">
                                <p className="fs-5 d-none d-lg-inline">{username}</p>
                    </div>
                    
                    <div className="d-inline p-1">
                        <img
                            src={avatar}
                            className="rounded-circle"
                            height="30"
                            alt="Black and White Portrait of a Man"
                            loading="lazy"
                        />
                    </div>
                </a>
                <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuAvatar"
                >
                <li>
                <div className='d-flex dropdown-item'>
                    <div className="d-inline ">
                        <FaUserAlt className='profile-icons' />
                    </div>
                    <div className="d-inline ">
                        <Link className="dropdown-item" to={`/profile/${username}`}>My profile</Link>
                    </div>
                    
                </div>
                </li>

                <li>
                    <div className='d-flex dropdown-item'>
                        <div className="d-inline">
                            <FaCog className='profile-icons' />
                        </div>
                        <div className="d-inline ">
                            <Link className="dropdown-item" to={`/profile-update/${username}`}>Settings</Link>
                        </div>
                        
                    </div>
                </li>

                <li><hr className="dropdown-divider" /></li>

                <li>
                    <div className='d-flex dropdown-item'>
                        <div className="d-inline ">
                            <FaSignOutAlt className='profile-icons' />
                        </div>
                        <div className="d-inline ">
                            <button className="dropdown-item" onClick={handlelogout}>Log out</button>
                        </div>
                        
                    </div>
                </li>

                </ul>
            
            </div>

    );
}

export default Usermenu;