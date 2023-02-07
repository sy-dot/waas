const $ = require('jquery');
const {remote} = require('electron');

const { ipcRenderer } = require('electron')
const ipc = ipcRenderer

//// MINIMIZE APP
minimizeBtn.addEventListener('click', ()=> {
  ipc.send('minimizeApp')
})

// MAXIMIZE RESTORE APP
maximizeBtn.addEventListener('click', ()=> {
  ipc.send('maximizeRestoreApp')
})

//// CLOSE APP
closeBtn.addEventListener('click', ()=> {
  ipc.send('closeApp')
})
