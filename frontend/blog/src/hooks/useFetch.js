import { useState, useEffect } from "react";
import axiosInstance from "../axios/authaxios";

const UseFetch = (url) => {

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
    },[url])
    return {data , isPending, error};
}

export default UseFetch;