import React from 'react';
import { ISearchVenue } from 'src/types/searchVenues';

interface ISingleVenueDetailsProps {
	venue: ISearchVenue;
}

const SingleVenueDetails: React.FC<ISingleVenueDetailsProps> = ({ venue }) => {
	return (
		<div className='space-y-5'>
			<div className='text-xl text-gray-500'>Restaurant Details</div>
			<div className='space-y-1'>
				<div className='flex space-x-2'>
					<h1 className='text-blue-500 text-lg font-semibold'>{venue.name}</h1>
					<span className='flex-shrink-0 text-blue-800 text-sm font-semibold'>{`${(
						venue.location.distance / 1000
					).toFixed(2)} km`}</span>
				</div>
				<div>
					{venue.location.address ? (
						<p className='font-semibold'>{venue.location.address}</p>
					) : (
						<p className='text-red-500'>No address</p>
					)}
					<div className='flex space-x-1'>
						{venue.location.city && <p>{`${venue.location.city}${venue.location.country ? ',' : ''}`}</p>}
						{venue.location.country && <p>{venue.location.country}</p>}
					</div>
				</div>
			</div>
			<div className='space-y-3'>
				<div className='space-y-1'>
					<p className='font-semibold'>Categories</p>
					{venue.categories.length > 0 ? (
						<div className='flex flex-wrap -m-1'>
							{venue.categories.map((c) => (
								<div key={c.id} className='bg-gray-400 overflow-hidden rounded-md m-1'>
									<img src={`${c.icon.prefix}44${c.icon.suffix}`} alt={c.shortName} />
								</div>
							))}
						</div>
					) : (
						<p>N/A</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default SingleVenueDetails;
