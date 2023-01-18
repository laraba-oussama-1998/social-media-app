import { FaSearch } from "react-icons/fa";
import PostList from "../posts/postlist";


const Main = () => {

    
    return ( 
            <div className="section">
            <div className="topics">
                <div className="div-search">
                    <input type="text" name="search" id="search" className="search" placeholder="Search" />
                    <FaSearch className="icon-search"/>
                </div>
                <h3>My topics:</h3>
                <a href="#">Design</a>
                <a href="#">Development</a>
                <a href="#">UX</a>
                <a href="#">Marketing</a>
            </div>
            <div className="article">
                <h2>Articles</h2>
                <div className="btn">
                    <a href="#">Following</a>
                    <i className="fa-solid fa-chevron-down"></i>
                </div>
            </div>
        
        <PostList />

        </div>
    );
}

export default Main;