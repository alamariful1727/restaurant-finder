import axios from 'axios';

if (!process.env.REACT_APP_FSQ_CLIENT_ID) {
	throw new Error('REACT_APP_FSQ_CLIENT_ID is required');
} else if (!process.env.REACT_APP_FSQ_CLIENT_SECRET) {
	throw new Error('REACT_APP_FSQ_CLIENT_SECRET is required');
} else if (!process.env.REACT_APP_FSQ_VERSION) {
	throw new Error('REACT_APP_FSQ_VERSION is required');
} else if (!process.env.REACT_APP_GOOGLE_API_KEY) {
	throw new Error('REACT_APP_GOOGLE_API_KEY is required');
}

export const API_ENDPOINT_LAMBDA = 'https://api.foursquare.com/v2';
export const FSQ_CLIENT_ID = process.env.REACT_APP_FSQ_CLIENT_ID;
export const FSQ_CLIENT_SECRET = process.env.REACT_APP_FSQ_CLIENT_SECRET;
export const FSQ_VERSION = process.env.REACT_APP_FSQ_VERSION;
export const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export const FSQApi = axios.create({
	baseURL: API_ENDPOINT_LAMBDA,
	headers: {
		'Content-type': 'application/json',
	},
});

export const AppTitle = 'Restaurant Finder';
