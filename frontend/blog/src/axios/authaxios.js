import axios from 'axios';
import axiosConfig from "./axios";
import { useNavigate } from 'react-router-dom';

const baseURL = axiosConfig.baseURL;
const axiosInstance = axios.create(axiosConfig);


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
			error.response.statusText === 'Unauthorized'
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
							
							axiosInstance.defaults.headers['Authorization'] =
								'JWT ' + response.data.access;
							
							return axiosInstance(originalRequest);
						})
						.catch((err) => {
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


export default axiosInstance;