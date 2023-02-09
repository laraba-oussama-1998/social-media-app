import axios from 'axios';
import axiosConfig from "./axios";
import { useNavigate } from 'react-router-dom';

const baseURL = axiosConfig.baseURL;
const axiosInstance = axios.create(axiosConfig);


let access_token = localStorage.getItem('access_token')
				?  localStorage.getItem('access_token')
				: null

let refresh_token = localStorage.getItem('refresh_token')
				?  localStorage.getItem('refresh_token')
				: null

axiosInstance.interceptors.request.use(async req => {
	
    if(!access_token){
        access_token = localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null
        req.headers.Authorization = `JWT ${access_token}`
    }
	if (req.url === "token/") return req
	let access_tokenParts = Math.ceil(Date.now() / 1000);
    try{
		const access_tokenParts = JSON.parse(atob(access_token.split('.')[1])).exp;
	}catch(error){
		console.log(error);
		
	}
		// exp date in token is expressed in seconds, while now() returns milliseconds:
	console.log("here")
	let now = Math.ceil(Date.now() / 1000);

	if (access_tokenParts > now){
		return req
		
	}else{
		
		const refresh_tokenParts = JSON.parse(atob(refresh_token.split('.')[1]));
		// exp date in token is expressed in seconds, while now() returns milliseconds:
		now = Math.ceil(Date.now() / 1000);
		
		if (refresh_tokenParts.exp > now){
			
			const response = await axios.post(`${baseURL}token/refresh/`, {
				refresh: refresh_token
				});
		
			localStorage.setItem('access_token', JSON.stringify(response.data.access))
			req.headers.Authorization = `JWT ${response.data.access}`
			return req

		}else{
			localStorage.removeItem('access_token')
			localStorage.removeItem('refresh_token')
			window.location.href = '/login/'
		}
	}
    
})

axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async function (error) {
		
		const originalRequest = error.config;
		
		
		if (typeof error.response === 'undefined') {
			
			return Promise.reject(error);
		}

		if (
			error.response.status === 401 &&
			originalRequest.url === baseURL + 'token/refresh/'
		) {
			
			window.location.href = '/login/';
			
			return Promise.reject(error);
		}

		if (
			error.response.data.code === 'token_not_valid' &&
			error.response.status === 401 &&
			error.response.statusText === 'Unauthorized' &&
			!originalRequest._retry
		) {
			
			const refreshToken = localStorage.getItem('refresh_token'); 
			
			if (refreshToken) {
				const refreshToken = localStorage.getItem('refresh_token'); 
				const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

				// exp date in token is expressed in seconds, while now() returns milliseconds:
				const now = Math.ceil(Date.now() / 1000);
				
				if (tokenParts.exp > now) {
					console.log("waiting for refreshement");
					return axiosInstance
						.post('/token/refresh/', { refresh: refreshToken })
						.then((response) => {
							console.log("refreshements")
							localStorage.setItem('access_token', response.data.access);
							console.log("refreshements "+response.data.access)
							
							axiosInstance.defaults.headers['Authorization'] =
								'JWT ' + response.data.access;

							originalRequest.headers['Authorization'] =
							'JWT ' + response.data.access; 
							
							
							originalRequest._retry = true;
							
							return axiosInstance(originalRequest);
						})
						.catch((err) => {
							return Promise.reject(err);
							console.log("refresh token didn't came")
							console.log(err);
						});
				}else{
					console.log("refresh token is expired you have to login again")
					window.location.href = '/login';
				}
			} else {
				console.log('Refresh token not available.');
				window.location.href = '/login';
			}
		}

		// specific error handling done elsewhere
		return Promise.reject(error);
	}
);
/*
*/
export default axiosInstance;