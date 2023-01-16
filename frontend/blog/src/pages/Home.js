import blog_image from '../media/blog_image.png'
import { Link } from 'react-router-dom';
import {FaBars} from 'react-icons/fa';
import Navbar from '../components/Navbar'
import Main from '../components/Home/Main'
import Aside from '../components/Home/Aside';

const Home = () => {
    return ( 

    <div className='html'>
    <Navbar />
    <div className="main">
        <Main />
        <Aside />
        
    </div>

</div>

    );
}

export default Home;