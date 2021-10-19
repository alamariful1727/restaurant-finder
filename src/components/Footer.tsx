import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
	return (
		<div className='flex justify-center items-center border-t px-6 py-3'>
			<p className='text-sm font-semibold text-center'>
				© Restaurant Finder {new Date().getFullYear()}. Developed by{' '}
				<NavLink
					to={{ pathname: 'https://www.linkedin.com/in/alamariful1727' }}
					target='_blank'
					rel='noopener noreferrer'
					className='text-blue-600 hover:text-blue-400'>
					Ariful Alam
				</NavLink>
			</p>
		</div>
	);
};

export default Footer;
