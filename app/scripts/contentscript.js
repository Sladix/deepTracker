const port = browser.runtime.connect({name: "deep-communication"});


document.addEventListener('click', function(){
  port.postMessage({action: 'click', payload: null});
  console.log("sent");
})
