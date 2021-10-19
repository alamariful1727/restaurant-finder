import React from 'react';
import { NavLink } from 'react-router-dom';
import Search from './Search';
const Navbar = () => {
	return (
		<header className='sticky top-0 flex flex-col items-center space-y-2 sm:flex-row sm:justify-between sm:space-y-0 sm:space-x-6 bg-white shadow-lg px-6 py-2 z-50'>
			<NavLink to='/' className='flex-shrink-0 flex space-x-3 justify-center items-center hover:text-black'>
				<img src='/logo192.png' alt='logo' className='w-10' />{' '}
				<span className='font-semibold text-lg'>Restaurant Finder</span>
			</NavLink>
			<Search />
		</header>
	);
};

export default Navbar;
