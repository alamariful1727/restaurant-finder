import React from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { GOOGLE_API_KEY } from 'src/config';
import { ISearchVenue } from 'src/types/searchVenues';

const center = {
	lat: 23.779197,
	lng: 90.4012843,
};
const zoom = 15;

interface IMapProps {
	venues?: ISearchVenue[];
	isLoading: boolean;
	isFetching: boolean;
}

const Map: React.FC<IMapProps> = ({ venues }) => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: GOOGLE_API_KEY,
	});

	if (loadError) return <p>{loadError}</p>;
	if (!isLoaded) return <p>Loading...</p>;

	return (
		<GoogleMap mapContainerStyle={{ height: 'calc(100vh - 101px)' }} zoom={zoom} center={center}>
			{venues &&
				venues.length > 0 &&
				venues.map((venue) => (
					<Marker
						key={venue.id}
						position={{ lat: venue.location.lat, lng: venue.location.lng }}
						icon={{
							url: '/restaurant.svg',
							origin: new window.google.maps.Point(0, 0),
							scaledSize: new window.google.maps.Size(50, 50),
						}}
						title={`${venue.name} - ${(venue.location.distance / 1000).toFixed(2)} km`}
					/>
				))}
		</GoogleMap>
	);
};

export default Map;
