const Store = require('electron-store')
const storage = new Store()

function getWinSettings () {
  const default_bounds = [516, 712]
  // const default_bounds = [500, 700]
  const size = storage.get('win-size')

  if (size) return size;
  else {
    storage.set('win-size', default_bounds)
    return default_bounds
  }
}

function saveBounds (bounds) {
  storage.set('win-size', bounds)
  // console.log('size:', bounds)
}

module.exports = {
  getWindowSettings: getWinSettings,
  saveBounds: saveBounds
}