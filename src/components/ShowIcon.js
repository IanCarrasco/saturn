import React, { Component } from 'react';
import {observer} from 'mobx-react'
import '../App.scss'
import {mainStore} from '../store/store'
import $ from 'jquery'
import axios from 'axios'
import SearchEntry from './SearchEntry'
import * as Spinner from 'react-spinkit'

@observer class ShowIcon extends Component {

	constructor(){

		super()
		this.state = {show:{}}

	}

	render(){
		return(
			<div>
			</div>
		)
		
	}
}

export default Show