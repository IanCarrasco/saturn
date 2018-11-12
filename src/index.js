import React from 'react';
import ReactDOM from 'react-dom';
import {mainStore} from './store/store.js'
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route} from 'react-router-dom'
import Sidebar from './components/Sidebar';
import Search from './components/Search';
import Show from './components/Show';
import Player from './components/Player'

ReactDOM.render(
	<BrowserRouter>
		<div>
			<div id="drag-region"></div>
			<Route path='/' component={Sidebar} />
			<Route path= '/' component={Player} />
			<Route exact path='/search' component={Search} />
			<Route path='/show/:showTitle' component={Show} />
		</div>
	</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
