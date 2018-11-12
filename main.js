const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const Store = require('electron-store')
const store = new Store();

let ipcMain = require('electron').ipcMain
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 1152, height: 648, titleBarStyle:'hiddenInset', 'minHeight': 300, 'minWidth': 300, backgroundColor:'#282C35'})

  // and load the index.html of the app.
  win.loadURL("http://localhost:3000")
  
  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

ipcMain.on('podcast-add', (event, arg) =>{

  //console.log('Received: ' + JSON.stringify(arg))
  
  console.log(arg)

  let podcastList = store.get('podcasts')

  if(podcastList){
    
    podcastList.unshift(arg)

    store.set('podcasts', podcastList )

  } else{

    store.set('podcasts', [arg])

  }

})
ipcMain.on('get-podcasts',  (event, arg) => {

  let podcastList = store.get('podcasts')

  //store.delete('podcasts')



  if(typeof podcastList === 'number'){
    store.set('podcasts', [])
  }
  
  console.log('Value:' + String(store.get('podcasts')))
  if (typeof store.get('podcasts') !== 'undefined'){
    event.sender.send('podcast-dist', store.get('podcasts'))
  }

})
  
  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.