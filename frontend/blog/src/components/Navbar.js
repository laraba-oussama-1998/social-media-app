import { Link } from 'react-router-dom';
import Usermenu from './Home/Usermenu';
import {FaBars, FaRegBell, FaPen} from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { selectUser, isUserLoggedIn } from '../redux/reducers/auth/authSlice';


const Navbar = () => {
    
    const user = useSelector(selectUser);
    const isloggedin = useSelector(isUserLoggedIn);
    
    /* useEffect(()=>{
        if (localStorage.getItem('access_token')){
            setLoggedIn(true);
        }

    },[]) */

            
    return ( 
        <div className='nav-container'>
        <nav className="navbar">

            <FaBars className='bell'/>
            <Link className= 'link' to="/">
                <h1>READER</h1>
            </Link>
            
            
            <ul className="right">
                
                {isloggedin && 
                    <div className='nav-right'>
                        <li>
                            <FaRegBell className='bell'/>
                        </li>
                        <li>
                            <Usermenu user= {user}/>
                        </li>
                        
                        <li>
                            <a href="newBlog">
                                <div className="write">
                                    <h3>Write</h3>
                                    <FaPen className='write-bell'/>
                                    
                                </div>
                            </a>
                        </li>
                    </div>
                }
                

                {!isloggedin && <div className='d-flex align-items-center'>
                    <li>
                        <Link type="button" className="mx-2 btn btn-outline-success" to="/login">Login</Link>
                    </li>
                <li>
                    <Link type="button" className="mx-2 btn btn-success" to="/register">Sign up</Link>
                </li>
                
                </div>
                }

            </ul>
            
        </nav>
    </div>

    );
}

export default Navbar;