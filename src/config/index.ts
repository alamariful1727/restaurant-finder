import axios from 'axios';

export const API_ENDPOINT_LAMBDA = 'https://api.foursquare.com/v2';
export const FSQ_CLIENT_ID = process.env.REACT_APP_FSQ_CLIENT_ID;
export const FSQ_CLIENT_SECRET = process.env.REACT_APP_FSQ_CLIENT_SECRET;
export const FSQ_VERSION = process.env.REACT_APP_FSQ_VERSION;

export const FSQApi = axios.create({
	baseURL: API_ENDPOINT_LAMBDA,
	headers: {
		'Content-type': 'application/json',
	},
});

export const AppTitle = 'Restaurant Finder';
