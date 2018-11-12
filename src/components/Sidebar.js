import React, { Component } from 'react';
import {observer} from 'mobx-react'
import '../App.scss'
import { Route, Link, Match } from "react-router-dom";
import mainStore from '../store/store'
import { DragDropContext, Draggable } from 'react-beautiful-dnd';

@observer class Sidebar extends Component {

	route = () =>{

		this.props.history.push('/search')

	}
	routeShow = (e) => {

		this.props.history.push('/show/' + e.path)

	}
	onDragEnd = () => {}
	render(){
		return(
			<div id="sidebar">
				<DragDropContext onDragEnd={this.onDragEnd}>
					<div id="scrollable">
						{mainStore.podcasts.map(podcast =>{

							return(
								<div id={podcast.path} key={podcast.path} onClick={() =>{this.routeShow(podcast)}} style={{borderColor: `${podcast.color}`, backgroundImage:`url(${podcast.thumbnail})`}} className="show-icon animate">
								</div>
							)

						})}
					</div>
					<div onClick = {this.route} id="add-show" className="show-icon">+</div>
				</DragDropContext>
			</div>
		)
		
	}
}

export default Sidebar