import React from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { FSQApi, FSQ_CLIENT_ID, FSQ_CLIENT_SECRET, FSQ_VERSION } from 'src/config';
import { ISearchVenue } from 'src/types/searchVenues';
import Map from 'src/components/Map';
import querystring from 'querystring';
import SingleVenueDetails from 'src/components/SingleVenueDetails';

const fetchData = async (query: string) => {
	let q = {
		client_id: FSQ_CLIENT_ID,
		client_secret: FSQ_CLIENT_SECRET,
		v: FSQ_VERSION,
		ll: '23.779197,90.4012843',
		intent: 'checkin',
		radius: 3000,
		query,
	};

	const res = await FSQApi.get<{ response: { venues: ISearchVenue[] } }>(`/venues/search?${querystring.stringify(q)}`);
	return res.data.response.venues;
};

const SearchPage = () => {
	const location = useLocation();
	const queryObject = new URLSearchParams(location.search);
	const queryText = queryObject.get('query');

	const { data, isLoading, isFetching } = useQuery<ISearchVenue[], Error>(
		['search-venues', queryText],
		() => fetchData(queryText!),
		{
			refetchOnWindowFocus: false,
			retry: 1,
			enabled: !!queryText,
		}
	);

	return (
		<div className='flex-grow'>
			<Map venues={data} isLoading={isLoading} isFetching={isFetching} />
			<SingleVenueDetails />
		</div>
	);
};

export default SearchPage;
