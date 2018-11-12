import React, { Component } from 'react';
import {observer} from 'mobx-react'
import '../App.scss'
import mainStore from '../store/store'
import $ from 'jquery'
import axios from 'axios'
import SearchEntry from './SearchEntry'
import * as Spinner from 'react-spinkit'
@observer class Search extends Component {

	constructor(){

		super()
		this.state = {res:[], darken:"", loading:"hidden"}

	}
	getSearchResults = (e) =>{

		axios.get("https://cors-anywhere.herokuapp.com/https://itunes.apple.com/search?media=podcast&term=" + e.target.value).then((data) =>{

			console.log(data.data)
			this.setState({res:data.data.results})

		})

	}

	render = () =>{
		return(
			<div>

				<div id="search" className={this.state.darken}>
					<input onChange={this.getSearchResults} type="text" id="podcast-search" placeholder="Search For Podcasts"></input>
					<div id="results">
						{this.state.res.map(result => {
							return(

								<SearchEntry history={this.props.history} data={result}></SearchEntry>

							)
						})}
					</div>
				</div>
			</div>
		)
		
	}
}

export default Search