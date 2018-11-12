import {observable, action} from 'mobx'
import $ from 'jquery'
import * as request from 'request'
import * as Vibrant from 'node-vibrant'
import * as slugify from '@sindresorhus/slugify'

let podcastParser = require('podcast-parser');

let ipcRenderer = window.require('electron').ipcRenderer

class Store {

	@observable podcasts = []

	@observable found = false

	@observable audioSrc = ""

	@observable loaded = false

	@observable title = ""

	constructor(){
		
		ipcRenderer.send('get-podcasts', {})
		ipcRenderer.on('podcast-dist', (event, arg) =>{

			console.log(arg)

			if(typeof arg === 'object'){}

			this.podcasts = arg

		})
	
	}

	@action.bound playShow =(arg1, arg2) =>{

		this.audioSrc = arg1
		this.title = arg2
	}

	@action addShow = url => {

		let formatString = ""


		url = url.substring(0, url.length);
		formatString = "?format=xml"

		console.log(url+formatString)

		podcastParser.execute(
			'https://cors-anywhere.herokuapp.com/'+ url + formatString,
			{},
			(err, res) => {
						if (err) {
								console.log(url)
								console.log(err);
								return;
						}

						console.log(res)
						this.loaded = true

						let showName = res.channel.title
						let showSlug = slugify(showName)
						let showUrl = res.channel.uri
						let showEpisodes = res.channel.items
						let thumbnail = res.channel.image
						let showDesc = res.channel.description


						let v = new Vibrant('https://cors-anywhere.herokuapp.com/'+thumbnail )


						v.getPalette((err, palette) => {}).then((col) =>{

							console.log(col)

							let color

							if (col.Vibrant != null){

								color = col.Vibrant.getHex()

							}

							else if (col.LightVibrant != null){

								color = col.LightVibrant.getHex()

							} 
							
							else if (col.LightMuted != null){

								color = col.LightMuted.getHex()

							}

							
							else if (col.DarkMuted != null){

								color = col.DarkMuted.getHex()

							}
							else if (col.DarkVibrant != null){

								color = col.DarkMuted.getHex()

							}else{

								color = "#fff"

							}

							let show = new Show(showName, showUrl, showSlug, showEpisodes, thumbnail, color, showDesc)

							for(var i = 0; i < this.podcasts.length; i++) {
								if (this.podcasts[i].title == showName) {
										this.found = true
										break;
								}
							}
											

							if(!this.found){
								this.podcasts.unshift(show)
								ipcRenderer.send('podcast-add', show)

							}
						})

			});
	}	
}
class Show {

	constructor(title, url, path, episodes, thumbnail, color, showDesc){

		this.title = title
		this.description = showDesc
		this.episodes = episodes
		this.url = url
		this.path = path
		this.thumbnail = thumbnail
		this.color = color
		
	}
}

let mainStore = new Store()

export default mainStore




