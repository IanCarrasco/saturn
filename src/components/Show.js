import React, { Component } from 'react';
import {observer} from 'mobx-react'
import '../App.scss'
import mainStore from '../store/store'
import $ from 'jquery'
import axios from 'axios'
import SearchEntry from './SearchEntry'
import {browserHistory} from 'react-router-dom'
import {hydrate, create} from 'mobx-persist'
import { SSL_OP_CISCO_ANYCONNECT } from 'constants';


@observer class Show extends Component {

	constructor(props){

		super(props)

		console.log(mainStore.podcasts)


		let show = mainStore.podcasts.find((elem) =>{

			return elem.path === this.props.match.params.showTitle

		})

		this.state = {show:show}

		this.shows = {}


	}
	componentWillReceiveProps = (newProps) =>{


		let show = mainStore.podcasts.find((elem) =>{

			return elem.path === newProps.match.params.showTitle

		})
		
		this.setState({show:show})

		localStorage.setItem('currentShow', JSON.stringify(show))
	
	}
	componentWillMount = () => {
		
		if(!this.state.show){

			this.setState({show:JSON.parse(localStorage.getItem('currentShow'))})

		}
	}
	playEpisode = (e) =>{

		mainStore.playShow(e.target.dataset.audio, e.target.dataset.title)
		
	}
	
	render = () =>{
		return(
			<div>
				<div className="show">
					<div className="show-header">
						<img className="show-image" src={this.state.show.thumbnail}/>
						<div className="info-container">
							<h1 className="show-title">{this.state.show.title}</h1>
							<h3 className="show-desc">{this.state.show.description}</h3>
						</div>
					</div>
					<div>
					{this.state.show.episodes.map(episode => {

						return(
							<div className="show-entry">
								<h3 className="ep-title">{episode.title}</h3>
								<button className="show-audio" onClick={this.playEpisode} data-title={episode.title} data-audio={episode.enclosure.url}>Play</button>
							</div>
						)


					})}
					</div>
				</div>
			</div>
		)
		
	}
}

export default Show