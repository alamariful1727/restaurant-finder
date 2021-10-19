import axios from 'axios';

export const API_ENDPOINT_LAMBDA = 'https://api.foursquare.com/v2';

export const FSQApi = axios.create({
	baseURL: API_ENDPOINT_LAMBDA,
	headers: {
		'Content-type': 'application/json',
	},
});

export const AppTitle = 'Restaurant Finder';
