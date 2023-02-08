import { SocialIcon } from 'react-social-icons';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/reducers/auth/authSlice';
import { useRef, useState, useEffect } from 'react';
import axiosInstance  from '../../axios/authaxios';

const ProfileCard = ({url}) => {
    const {user_name} = useSelector(selectUser);
    const followersRef = useRef();
    const {id} = useParams();
    //const {data: info, error, isPending} = UseFetch('/user/profile/'+id+'/');
    
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(null);
    const [error, setError] = useState(null);
    
    useEffect(()=>{
    const abortCont = new AbortController();

    axiosInstance.get(url,{signal: abortCont.signal})
    .then(res =>{
        if (res.statusText !== "OK") { // error coming back from server
            throw Error('could not fetch the data for that resource');
        } 
        setData(res.data);
        setIsPending(false);
        setError(null);

    }).catch(err => {
        if (err.name === 'AbortError') {
            console.log('fetch aborted')
        } else {
          // auto catches network / connection error
            setIsPending(false);
            setError(err.message);
        }
        })

    return () => abortCont.abort();
    },[id])


    const handleFollowClick = (e) =>{
        e.preventDefault();
        console.log(data);
        if(e.target.name === "follow"){
            axiosInstance.post('/user/profile/'+data.user_name+'/follow/',{"action": "follow"})
            .then((res)=>{
            setData({...data, followers_count: data.followers_count+1,
                is_following: true});
            console.log(res.data)
            }).catch((err)=>{
                console.log(err);
            })
            
        }else{

            axiosInstance.post('/user/profile/'+data.user_name+'/follow/',{"action": "unfollow"})
            .then((res)=>{
            setData({...data, followers_count: data.followers_count-1,
                is_following: false});
            console.log(res)
            }).catch((err)=>{
                console.log(err);
            })
            setData({...data, followers_count: data.followers_count-1,
                is_following: false})
        }
    }
    return ( 
    
        <div className="col-lg-4">
            { error && <div>{ error }</div> }
            { isPending && <div>Loading...</div> }

            { data && <>
                <div className="text-center card">
                    <div className="card-body pt-2 pb-2">
                        <div className="thumb-lg member-thumb mx-auto">
                            <img src={data.avatar}
                                className="rounded-circle img-thumbnail"
                                height="150"
                                width="150"
                                alt="profile-image"/></div>
                        <div className="my-3">
                            <h4>{data.user_name}</h4>
                            <p className="text-muted">{data.profession}</p>
                        </div>

                        <ul className="social-links list-inline my-4  mx-2">
                            <li className="list-inline-item mx-3"><SocialIcon network="facebook" url={data.facebook_link} style={{ height: 40, width: 40 }}/></li>
                            <li className="list-inline-item mx-3"><SocialIcon network="instagram" url={data.instagram_link} style={{ height: 40, width: 40 }}/></li>
                            <li className="list-inline-item mx-3"><SocialIcon network="twitter" url={data.twitter_link} style={{ height: 40, width: 40 }}/></li>
                        </ul>

                        {user_name !== id &&
                        <>
                        {!data.is_following && <button type="button" name="follow" onClick={handleFollowClick} className="follow-btn fs-3 m-1">follow</button>}
                        {data.is_following && <button type="button" name="unfollow" onClick={handleFollowClick} className="unfollow-btn  fs-3 m-1">following</button>}
                        </>
                        }
                        
                        <div className="my-3 pt-2">
                            <div className="row">

                                <div className="col-4 border-end border-2">
                                    <div className="m-2">
                                        <h4 ref={followersRef}>{data.followers_count}</h4>
                                        <p className="mb-0 text-muted">Followers</p>
                                    </div>
                                </div>

                                <div className="col-4 border-end border-2">
                                    <div className="m-2">
                                        <h4>{data.following_count}</h4>
                                        <p className="mb-0 text-muted">Following</p>
                                    </div>
                                </div>

                                <div className="col-4">
                                    <div className="m-2">
                                        <h4>{data.posts_number}</h4>
                                        <p className="mb-0 text-muted">Posts</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>}
                
            </div>

);
}

export default ProfileCard;