import { useRef } from "react";
import axiosInstance from "../../axios/authaxios";

const DeleteModal = ({handleDelete, post_id}) => {


    
    // When the user clicks on <span> (x), close the modal
    const handleClose = (e)=>{
        childref.current.parentElement.style.display = "none";
    }
    const childref = useRef(null)
    
    const Delete = (e)=>{
        e.preventDefault();
        childref.current.parentElement.style.display = "none";
        handleDelete(post_id)
    }

    return ( <>
    
        <div ref={childref} className="modal-content">
            <div className="modal-header">
                <h2>Delete Confirmation</h2>
                <span className="close" onClick={handleClose}>&times;</span>
            </div>
            <hr style={{color:"gray"}} />
            <div className="modal-body">
                <p>Are you sure you want delete this post ??</p>
            </div>
            
            <hr style={{color:"gray"}} />
            <div className="modal-footer">
                
                <button className="btn btn-secondary fs-4 modal-button" onClick={handleClose}>Close</button>
                <button className="btn btn-danger fs-4 modal-button" onClick={Delete}>Delete</button>
            </div>
        </div>

    </> );
}
 
export default DeleteModal;