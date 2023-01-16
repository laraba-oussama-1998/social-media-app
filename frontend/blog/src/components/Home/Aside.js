import notebook_img from "../../media/notebook.png"

const Aside = () => {
    return ( 
        <div className="aside">
            <div className="note_card">
                <div className="left">
                    <h1>Get unlimited access to everything on Reader</h1>
                    <p>Plans starting at less than 1$/week.</p>
                    <a href="#">Get unlimited access</a>
                </div>
                <div className="right">
                    <img src={notebook_img} alt="" className="notebook" />
                </div>
            </div>

            
            <div className="following">
                <h1 className="interest">People you might be interested</h1>
                <div className="first">
                    <img src="images/profile.jfif" alt="" />
                    <div className="info">
                        <h3 className="name">Behiani Mohamed</h3>
                        <p className="bio">Msc Networks and Embedded Systems | Siemens Algeria</p>
                    </div>
                    <div className="follow-btn">
                        <a href="#">Follow</a>
                    </div>
                </div>
                <div className="seconde">
                    <img src="images/person1.jpg" alt="" />
                    <div className="info">
                        <h3 className="name">Laraba Oussama</h3>
                        <p className="bio">Msc Networks and Embedded Systems | Siemens Algeria</p>
                    </div>
                    <div className="follow-btn">
                        <a href="#">Follow</a>
                    </div>
                </div>
                <div className="third">
                    <img src="images/person2.jfif" alt="" />
                    <div className="info">
                        <h3 className="name">Abdou Lounis</h3>
                        <p className="bio">Msc Networks and Embedded Systems | Siemens Algeria</p>
                    </div>
                    <div className="follow-btn">
                        <a href="#">Follow</a>
                    </div>
                </div>
            </div>
            
            <div className="reading">
            <h1 className="reading-title">My reading list</h1>
            <div className="reading-post">
                
                <div className="reading-post__img">
                    <img src="images/porsche.jpg" alt="" />
                </div>
                <div className="reading-post__info">
                    <h1 className="reading-post__title">A Beginner's Guid to White Balance in Photography</h1>
                    <p className="reading-post__text">Lorem ipsum dolor sit amet adipisicing elit. Quas
                        quo dolore this is the end.</p>
                    <div className="reading-post__author">
                        <img src="images/profile.jfif" alt="" className="reading-post__author__avatar" />
                        <a className="reading-post__author-info">
                            <h3 className="reading-post__author__name">Behiani Mohamed</h3>
                            <span>.</span>
                            <h4 className="reading-post__author__date">Apr 16, 2022</h4>
                        </a>
                    </div>
                </div>
            </div>
            <div className="reading-post">
                <div className="reading-post__img">
                    <img src="images/amg.png" alt="" />
                </div>
                <div className="reading-post__info">
                    <h1 className="reading-post__title">A Beginner's Guid to White Balance in Photography</h1>
                    <p className="reading-post__text">Lorem ipsum dolor sit amet adipisicing elit. Quas
                        quo dolore this is the end.</p>
                    <div className="reading-post__author">
                        <img src="images/person1.jpg" alt="" className="reading-post__author__avatar" />
                        <a className="reading-post__author-info">
                            <h3 className="reading-post__author__name">Laraba Oussama</h3>
                            <span>.</span>
                            <h4 className="reading-post__author__date">Apr 16, 2022</h4>
                        </a>
                    </div>
                </div>
            </div>
            <div className="reading-post">
                <div className="reading-post__img">
                    <img src="images/m8.jpg" alt="" />
                </div>
                <div className="reading-post__info">
                    <h1 className="reading-post__title">A Beginner's Guid to White Balance in Photography</h1>
                    <p className="reading-post__text">Lorem ipsum dolor sit amet adipisicing elit. Quas
                        quo dolore this is the end.</p>
                    <div className="reading-post__author">
                        <img src="images/person2.jfif" alt="" className="reading-post__author__avatar" />
                        <a className="reading-post__author-info">
                            <h3 className="reading-post__author__name">Abdou Lounis</h3>
                            <span>.</span>
                            <h4 className="reading-post__author__date">Apr 16, 2022</h4>
                        </a>
                    </div>
                </div>
            </div>
            </div>
            
        </div>
    );
}

export default Aside;