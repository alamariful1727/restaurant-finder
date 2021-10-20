import React, { useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { GOOGLE_API_KEY } from 'src/config';
import { ISearchVenue } from 'src/types/searchVenues';
import { Drawer } from 'antd';
import SingleVenueDetails from './SingleVenueDetails';

const center = {
	lat: 23.781517,
	lng: 90.4005155,
};
const zoom = 15;

interface IMapProps {
	venues?: ISearchVenue[];
	isLoading: boolean;
	isFetching: boolean;
}

const Map: React.FC<IMapProps> = ({ venues }) => {
	const [selectedVenue, setSelectedVenue] = useState<ISearchVenue>();
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: GOOGLE_API_KEY,
	});

	if (loadError) return <p>{loadError}</p>;
	if (!isLoaded) return <p>Loading...</p>;

	console.log('selectedVenue', selectedVenue);

	return (
		<React.Fragment>
			<GoogleMap mapContainerStyle={{ height: 'calc(100vh - 101px)' }} zoom={zoom} center={center}>
				<Marker
					position={{ lat: center.lat, lng: center.lng }}
					icon={{
						url: '/monsterLab.png',
						origin: new window.google.maps.Point(0, 0),
						scaledSize: new window.google.maps.Size(50, 50),
					}}
					title='Monstarlab Bangladesh'
				/>
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
							onClick={() => {
								setSelectedVenue(venue);
							}}
						/>
					))}
			</GoogleMap>
			<Drawer width={320} placement='right' onClose={() => setSelectedVenue(undefined)} visible={!!selectedVenue}>
				{selectedVenue && <SingleVenueDetails venue={selectedVenue} />}
			</Drawer>
		</React.Fragment>
	);
};

export default Map;
