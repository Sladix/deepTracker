const port = browser.extension.connect({
    name: "deep-communication"
});
const dataElement = document.getElementById('data');
const whipeElement = document.getElementById('whipe');


port.postMessage({action: 'getData', payload: null});
port.onMessage.addListener(function(msg) {
  if(msg.action == 'getData' || msg.action == 'whipe'){
    let d = document.createElement('code');
    let str = JSON.stringify(msg.payload, undefined, 2); // Parse
    d.innerHTML = str;
    let pre = document.createElement('pre');
    pre.appendChild(d);
    dataElement.innerHTML = ''; // Clean
    dataElement.appendChild(pre); // Append
  }

});

whipeElement.addEventListener('click', function(e){
  e.preventDefault();
  port.postMessage({action: 'whipe', payload: null});
})
