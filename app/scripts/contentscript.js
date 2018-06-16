const port = browser.runtime.connect({name: "deep-communication"});


window.addEventListener('click', function(){
  port.postMessage({action: 'click', payload: null});
  console.log("sent");
});

window.addEventListener('keypress', function (e) {
  console.log('jey down');
  port.postMessage({action: 'keypress', payload: e});
}, false); //add the keyboard handler
