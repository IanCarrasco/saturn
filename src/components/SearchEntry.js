import React, { Component } from 'react';
import {observer} from 'mobx-react'
import '../App.scss'
import mainStore from '../store/store'
import * as Spinner from 'react-spinkit'
import * as waitUntil from 'wait-until'
import $ from 'jquery'
import axios from 'axios'
@observer class SearchEntry extends Component {
	constructor(){

		super()
		this.state = {loading:'hidden'}
	}
	addShow = () =>{
		
		let len = mainStore.podcasts.length
		
		mainStore.addShow(this.props.data.feedUrl)
	
		this.setState({loading:'visible'})
		waitUntil(1000, 7, () => {
			
			return ((mainStore.podcasts.length == len + 1 &&
							mainStore.podcasts[0].url == this.props.data.feedUrl &&
							mainStore.found ? true : false))
		
		},(result) => {

			this.setState({loading:'hidden'})
			this.props.history.push('/show/' + mainStore.podcasts[0].path)

		});


		console.log('showAdded')
	}
	render(){
		return(
			<div>
				<div id="loading-overlay" className={this.state.loading}>
					<Spinner id="loader" name="cube-grid" />
				</div>
				<div onClick={this.addShow} id="searchResult">
					<img src={this.props.data.artworkUrl100}></img>
					<h3>{this.props.data.trackName}</h3>
				</div>
			</div>
		)
		
	}
}

export default SearchEntry