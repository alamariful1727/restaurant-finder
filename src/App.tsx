import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import SearchPage from './pages/search';

function App() {
	return (
		<BrowserRouter>
			<div className='relative min-h-screen antialiased flex flex-col bg-white'>
				<Navbar />
				<Switch>
					<Route exact path='/' component={SearchPage} />
				</Switch>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
