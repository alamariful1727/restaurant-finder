import React from 'react';
import { NavLink } from 'react-router-dom';
import Search from './Search';
const Navbar = () => {
	return (
		<header className='sticky top-0 flex justify-between items-center bg-white shadow-lg px-6 py-2 z-50'>
			<NavLink to='/' className='flex space-x-3 justify-center items-center'>
				<img src='/logo192.png' alt='logo' className='w-10' />{' '}
				<span className='font-semibold text-lg'>Restaurant Finder</span>
			</NavLink>
			<Search />
		</header>
	);
};

export default Navbar;
