import { useRef, useState, useEffect, useParams } from "react";


const CreateFrom = ({post:data,setPost:setData, create, handleSubmit}) => {
    
    function adjustHeight() {
        textbox.current.style.height = "inherit";
        textbox.current.style.height = `${textbox.current.scrollHeight}px`;
    }

    const textbox = useRef(null);
    const handleKeyDown = (e)=>{
        e.preventDefault()
        adjustHeight();
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }

    const handleUpload =(e) =>{
        e.preventDefault();
        
        setData({
            ...data,
            image: {
                preview: URL.createObjectURL(e.target.files[0]),
                file: e.target.files[0]
            }
        });
    }

    const handleChange = (e)=>{
        e.preventDefault();
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
        
    }
    console.log(data)

    useEffect(()=> {adjustHeight()
        // change the image field when load the data to make it readable
        setData({
            ...data,
            image: {
                preview: data.image===null? "" :data.image,
                file: null
            },
            category: data.category_name
        });
        
    },[])
    
    return ( 
        
        <>
        <div className="post-create">
            <div className="post-create_fields">
                <label className="small mb-1"  htmlFor="inputAdresse">Title</label>
                <input type="text" className="input" id="title" name="title" placeholder="Title"
                value={data.title}
                onChange={handleChange} />
            </div>

            <div className="post-create_fields">
            <label className="small mb-1"  htmlFor="inputAdresse">Content</label>
                <textarea type="text" className="post-create_content"
                id="content" ref= {textbox}
                value={data.content}
                onChange={handleKeyDown}
                name="content" placeholder="Content"
                rows ="3" cols="33" />
            </div>

            {data.image && <img className="post-create_image" src={data.image.preview}/>}
            <div className="btn btn-success fs-3">
                <input type="file" id="image" name="image" className='file-input'
                onChange={handleUpload}/>
                        Upload  image
            </div>
            
                
            <div className="post-create_fields">
                <label className="small mb-1"  htmlFor="inputAdresse">Category</label>
                <input type="text" className="input" id="category" name="category" placeholder="category"
                value={data.category}
                onChange={handleChange} />
            </div>

            <div  className="post-create_fields">
                <label className="small mb-1"  htmlFor="inputAdresse">Status</label>
                <select className="form-select fs-5" aria-label="Default select example" 
                name="status"
                defaultValue={data.status}
                onChange={handleChange}>
                    <option value="draft" >Draft</option>
                    <option value="published">Published</option>
                </select>
            </div>
            
            
            <button className="btn btn-success fs-3 create-button" onClick={(e) => {
                e.preventDefault();
                handleSubmit(data)}}>{create === true? "Create":"Update"}</button>
            
        </div>
        </>
     );
}
 
export default CreateFrom;