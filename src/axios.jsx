import axios from 'axios';

const url = 'http://localhost:3000/api/v1';

export const makeRequest = axios.create({
	withCredentials: true,
	baseURL: url,
	headers: {},
});

export default url;
