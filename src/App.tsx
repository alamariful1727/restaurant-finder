import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { LandingPage } from './pages/landing';
import SearchPage from './pages/search';

function App() {
	return (
		<BrowserRouter>
			<div className='relative min-h-screen antialiased flex flex-col bg-white'>
				<Navbar />
				<div className='flex-grow'>
					<Switch>
						<Route exact path='/' component={LandingPage} />
						<Route exact path='/search' component={SearchPage} />
					</Switch>
				</div>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
