import React, { useCallback, useState } from 'react';
import { GoogleMap, InfoWindow, Marker, useLoadScript } from '@react-google-maps/api';
import { GOOGLE_API_KEY } from 'src/config';

const center = {
	lat: 23.779197,
	lng: 90.4012843,
};

const zoom = 15;

const Map = () => {
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: GOOGLE_API_KEY,
	});

	if (loadError) return <p>{loadError}</p>;
	if (!isLoaded) return <p>Loading...</p>;

	return <GoogleMap mapContainerStyle={{ height: 'calc(100vh - 101px)' }} zoom={zoom} center={center}></GoogleMap>;
};

export default Map;
