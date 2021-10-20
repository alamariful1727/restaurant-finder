import React, { useCallback, useMemo, useRef, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { GOOGLE_API_KEY } from 'src/config';
import { ISearchVenue } from 'src/types/searchVenues';
import { Drawer } from 'antd';
import SingleVenueDetails from './SingleVenueDetails';
import useSupercluster from 'use-supercluster';

const center = {
	lat: 23.781517,
	lng: 90.4005155,
};

interface IMapProps {
	venues?: ISearchVenue[];
	isLoading: boolean;
	isFetching: boolean;
}

const Map: React.FC<IMapProps> = ({ venues = [] }) => {
	const [selectedVenue, setSelectedVenue] = useState<ISearchVenue>();
	const [bounds, setBounds] = useState<number[]>();
	const [zoom, setZoom] = useState(15);
	const { isLoaded, loadError } = useLoadScript({
		googleMapsApiKey: GOOGLE_API_KEY,
	});
	const mapRef = useRef<google.maps.Map>();

	const onMapLoad = useCallback((map: google.maps.Map) => {
		mapRef.current = map;
	}, []);
	// const panTo = useCallback((data: { lat: number; lng: number }) => {
	// 	if (mapRef && mapRef.current) {
	// 		mapRef.current.panTo(data);
	// 		mapRef.current.setZoom(14);
	// 	}
	// }, []);
	const onZoomChanged = useCallback(() => {
		if (mapRef && mapRef.current) {
			const z = mapRef.current.getZoom();
			setZoom(z || zoom);
		}
	}, [zoom]);
	const onBoundsChanged = useCallback(() => {
		if (mapRef && mapRef.current) {
			const b = mapRef.current.getBounds();
			if (b) {
				const west = b.getSouthWest().lng();
				const south = b.getSouthWest().lat();
				const east = b.getNorthEast().lng();
				const north = b.getNorthEast().lat();

				// ? For setting the bounds, we need to follow the sequence
				setBounds([west, south, east, north]);
			}
		}
	}, []);

	const points = useMemo(() => {
		const formattedPoints = venues.map((venue) => ({
			type: 'Feature',
			properties: { cluster: false, venue },
			geometry: {
				type: 'Point',
				coordinates: [venue.location.lng, venue.location.lat],
			},
		}));
		return formattedPoints;
	}, [venues]);

	const { clusters, supercluster } = useSupercluster({
		points,
		bounds,
		zoom,
		options: { radius: 75, maxZoom: 25 },
	});

	if (loadError) return <p>{loadError}</p>;
	if (!isLoaded) return <p>Loading...</p>;

	return (
		<React.Fragment>
			<GoogleMap
				mapContainerStyle={{ height: 'calc(100vh - 101px)' }}
				zoom={zoom}
				center={center}
				onLoad={onMapLoad}
				onZoomChanged={onZoomChanged}
				onBoundsChanged={onBoundsChanged}>
				<Marker
					position={{ lat: center.lat, lng: center.lng }}
					icon={{
						url: '/monsterLab.png',
						origin: new window.google.maps.Point(0, 0),
						scaledSize: new window.google.maps.Size(50, 50),
					}}
					title='Monstarlab Bangladesh'
				/>
				{clusters.map((cluster) => {
					const [lng, lat] = cluster.geometry.coordinates;
					const { cluster: isCluster, point_count: pointCount } = cluster.properties;

					if (isCluster) {
						return (
							<Marker
								key={`cluster-${cluster.id}`}
								position={{ lat, lng }}
								title={pointCount.toString()}
								visible={true}
								label={pointCount.toString()}
								zIndex={1000}
								onClick={() => {
									if (mapRef && mapRef.current) {
										const expansionZoom = Math.min(supercluster.getClusterExpansionZoom(cluster.id), 20);
										mapRef.current.setZoom(expansionZoom);
										mapRef.current.panTo({ lat, lng });
									}
								}}
							/>
						);
					} else {
						return (
							<Marker
								key={cluster.properties.venue.id}
								position={{ lat, lng }}
								icon={{
									url: '/restaurant.svg',
									origin: new window.google.maps.Point(0, 0),
									scaledSize: new window.google.maps.Size(50, 50),
								}}
								title={`${cluster.properties.venue.name} - ${(
									cluster.properties.venue.location.distance / 1000
								).toFixed(2)} km`}
								onClick={() => {
									setSelectedVenue(cluster.properties.venue);
								}}
							/>
						);
					}
				})}
			</GoogleMap>
			<Drawer width={320} placement='right' onClose={() => setSelectedVenue(undefined)} visible={!!selectedVenue}>
				{selectedVenue && <SingleVenueDetails venue={selectedVenue} />}
			</Drawer>
		</React.Fragment>
	);
};

export default Map;
