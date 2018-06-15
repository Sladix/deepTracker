const port = browser.extension.connect({
    name: "deep-communication"
});
const dataElement = document.getElementById('data');


port.postMessage({action: 'getData', payload: null});
port.onMessage.addListener(function(msg) {
  if(msg.action == 'getData'){
    let d = document.createElement('code');
    let str = JSON.stringify(msg.payload, undefined, 2);
    d.innerHTML = str;
    let pre = document.createElement('pre');
    pre.appendChild(d);
    dataElement.appendChild(pre);
  }

});
console.log('welcome');
