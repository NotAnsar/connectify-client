import axios from 'axios';
//https://connectify-api-oza9.onrender.com/https://connectify-api-oza9.onrender.com/
const url = 'https://connectify-api-oza9.onrender.com/api/v1';

export const makeRequest = axios.create({
	withCredentials: true,
	baseURL: url,
	headers: {},
});

export default url;
