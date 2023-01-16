import { FaSearch } from "react-icons/fa";

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
                    <div className="blogs">
                        <div className="devider"></div>
                        <div className="blog-post">
                            <div className="blog-post__info">
                                <div className="blog-post__author">
                                    <img src="images/profile.jfif" alt="" className="blog-post__author__avatar" />
                                    <a href="/user/<%= blog.user_name %>" className="blog-post__author-info">
                                        <h3 className="blog-post__author__name">
                                            user name
                                        </h3>
                                        <h4 className="blog-post__author__bio">Msc Networks and Embedded Systems | Siemens
                                            Algeria
                                        </h4>
                                    </a>
                                </div>
                                <a href="/blog/<%= blog._id %>">
                                    <h1 className="blog-post__title">
                                        blog title
                                    </h1>
                                </a>
                                <p className="blog-post__text">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis sit quas sapiente excepturi autem. Ex, accusantium obcaecati excepturi id dolor odio distinctio perspiciatis unde sed aspernatur optio eos quaerat cum!
                                </p>
                                <a href="#" className="blog-post__btn">UX Design</a>
                                <a href="#" className="blog-post__btn">4 min read</a>
                            </div>
                            <div className="blog-post__img">
                                <img src="images/porsche.jpg" alt="" />
                            </div>
                        </div>

                        <div className="devider"></div>

                        <div className="blog-post">
                            <div className="blog-post__info">
                                <div className="blog-post__author">
                                    <img src="images/profile.jfif" alt="" className="blog-post__author__avatar" />
                                    <a href="/user/<%= blog.user_name %>" className="blog-post__author-info">
                                        <h3 className="blog-post__author__name">
                                            user name
                                        </h3>
                                        <h4 className="blog-post__author__bio">Msc Networks and Embedded Systems | Siemens
                                            Algeria
                                        </h4>
                                    </a>
                                </div>
                                <a href="/blog/<%= blog._id %>">
                                    <h1 className="blog-post__title">
                                        blog title
                                    </h1>
                                </a>
                                <p className="blog-post__text">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis sit quas sapiente excepturi autem. Ex, accusantium obcaecati excepturi id dolor odio distinctio perspiciatis unde sed aspernatur optio eos quaerat cum!
                                </p>
                                <a href="#" className="blog-post__btn">UX Design</a>
                                <a href="#" className="blog-post__btn">4 min read</a>
                            </div>
                            <div className="blog-post__img">
                                <img src="images/porsche.jpg" alt="" />
                            </div>
                        </div>
                        

                    </div>
                    
        </div>
     );
}
 
export default Main;