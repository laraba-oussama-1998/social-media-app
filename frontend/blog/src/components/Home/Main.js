import { FaSearch } from "react-icons/fa";
import PostList from "../posts/PostList";
import useFetch from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import axiosInstance from "../../axios/authaxios";
import { useState } from "react";


const Main = () => {

    const {data: categories, isPending, error} = useFetch("category");
    const posts = useFetch("blog");
    const {data: following} = useFetch("user/profile/following/")
    
    const setDataValue = posts.setDataValue;
    const [search, setSearch] = useState('');
    
    const handleCatClick = (e) =>{
        e.preventDefault()
        console.log('blog/?category='+e.target.name);
        axiosInstance.get('blog/?category='+e.target.name)
        .then((res)=>{
            console.log(res.data)
            setDataValue(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    const handleSearch = (e) =>{
        
        e.preventDefault()
        console.log('blog/?search='+search);
        
        axiosInstance.get('blog/?search='+search)
        .then((res)=>{
            console.log(res.data)
            setDataValue(res.data)
        }).catch((err)=>{
            console.log(err)
        })
        
    }
    
    return ( 
            <div className="section">
            <div className="topics">
                <div className="div-search">
                    <input type="search" name="search" id="search" className="search" placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
                    <FaSearch type="button" onClick={handleSearch} className="icon-search"/>
                </div>
                <h3>My topics:</h3>
                { error && <div>{ error }</div> }
                { isPending && <div>Loading...</div> }
                { categories && <>
                <div className="devider"></div>
                {categories.map(category =>(
                    <a type="button" 
                        key= {category.id}
                        name={category.name}
                        onClick={handleCatClick}>{category.name}</a>
                ))}
                </>}
            </div>
            <div className="article">
                <h2>Articles</h2>
                <div className="btn">
                    <a href="#">Following</a>
                    <i className="fa-solid fa-chevron-down"></i>
                </div>
            </div>
        
        <PostList posts={{...posts}}/>

        </div>
    );
}

export default Main;