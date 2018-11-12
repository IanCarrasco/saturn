import React, { Component } from 'react';
import {observer} from 'mobx-react'
import '../App.scss'
import mainStore from '../store/store'
import { action, spy } from 'mobx';


@observer class Player extends Component {
	
	constructor(){

		super()
		this.state = {audio:""}
	}

	componentDidMount = () =>{

		spy((event) => {

			switch(event.name){


				case 'playShow':
					this.setState({audio:event.arguments[0]})
					this.loadAudio()


			}

		})
	}

	loadAudio = (e) => {
		this.refs.audio.pause();
		this.refs.audio.load();

	}

	render = () =>{
		return(
			<div className="player">
				<h1 style={{color:"white"}}>{mainStore.title}</h1>
				<audio src={this.state.audio}  preload="true" ref="audio" controls></audio>			
			</div>
		)
		
	}
}

export default Player