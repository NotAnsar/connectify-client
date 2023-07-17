import axios from 'axios';

const url = import.meta.env.VITE_BACKEND_APP_URL;

export const makeRequest = axios.create({
	withCredentials: true,
	baseURL: url,
	headers: {},
});

export default url;
