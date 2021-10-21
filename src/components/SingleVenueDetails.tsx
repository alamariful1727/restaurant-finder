import React from 'react';
import { Drawer } from 'antd';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { clearVenue } from 'src/stores/VenueReducer';

const SingleVenueDetails = () => {
	const dispatch = useAppDispatch();
	const selectedVenue = useAppSelector((state) => state.venueReducer.selectedVenue);

	const handleDrawerOnClose = () => {
		dispatch(clearVenue());
	};

	return (
		<Drawer width={320} placement='right' onClose={handleDrawerOnClose} visible={!!selectedVenue}>
			{selectedVenue && (
				<div className='space-y-5'>
					<div className='text-xl text-gray-500'>Restaurant Details</div>
					<div className='space-y-1'>
						<div className='flex space-x-2'>
							<h1 className='text-blue-500 text-lg font-semibold'>{selectedVenue.name}</h1>
							<span className='flex-shrink-0 text-blue-800 text-sm font-semibold'>{`${(
								selectedVenue.location.distance / 1000
							).toFixed(2)} km`}</span>
						</div>
						<div>
							{selectedVenue.location.address ? (
								<p className='font-semibold'>{selectedVenue.location.address}</p>
							) : (
								<p className='text-red-500'>No address</p>
							)}
							<div className='flex space-x-1'>
								{selectedVenue.location.city && (
									<p>{`${selectedVenue.location.city}${selectedVenue.location.country ? ',' : ''}`}</p>
								)}
								{selectedVenue.location.country && <p>{selectedVenue.location.country}</p>}
							</div>
						</div>
					</div>
					<div className='space-y-3'>
						<div className='space-y-1'>
							<p className='font-semibold'>Categories</p>
							{selectedVenue.categories.length > 0 ? (
								<div className='flex flex-wrap -m-1'>
									{selectedVenue.categories.map((c) => (
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
			)}
		</Drawer>
	);
};

export default SingleVenueDetails;
