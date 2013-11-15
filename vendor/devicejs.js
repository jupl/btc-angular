// Rename device.js reference for Cordova
if(window.device) {
  window.devicejs = device.noConflict();
}
