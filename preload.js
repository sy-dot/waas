// const dns = require("dns");
// const path = require('path');
// const internetAvailable = require('internet-available');
// const notifier = require('node-notifier');

// internetAvailable().then(() => {
//   console.log('good');
// }).catch(() => {
//   notifier.notify({
//     appName: 'Windows Assistant',
//     title: 'Без интернета (OK)',
//     message: 'Некоторые функции приложения будут не доступны!',
//     icon: path.join(__dirname, 'icons/app-icon.png'),
//     contentImage: path.join(__dirname, 'icons/app-icon.png'),
//     open: 'file://' + path.join(__dirname, 'icons/app-icon.png'),
//     sound: false
//   });
// });

// internetAvailable({
//   timeout: 4000,
//   retries: 10,
// }).then(function () {
//   console.log("Internet available");
// }).catch(function () {
//   notifier.notify({
//     appName: 'Windows Assistant',
//     title: 'Без интернета (OK)',
//     message: 'Некоторые функции приложения будут не доступны!',
//     icon: path.join(__dirname, 'icons/app-icon.png'),
//     contentImage: path.join(__dirname, 'icons/app-icon.png'),
//     open: 'file://' + path.join(__dirname, 'icons/app-icon.png'),
//     sound: false
//   });
// });