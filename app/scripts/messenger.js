let handlers = {};

function addListener(actionsHandlers){
  handlers = _.assignIn(handlers,actionsHandlers);
}

function onTabRemoved(callback){
  browser.tabs.onRemoved.addListener(callback);
}

function sendMessage(port, msg, payload){
  port.postMessage({action: msg.action, payload});
}

function callCb(port, msg){
  if(handlers[msg.action]){
    let response = handlers[msg.action](msg);
    if(response){
      sendMessage(port, msg, response);
    }
  }
}

browser.runtime.onConnect.addListener(function(port){
  port.onMessage.addListener(function(msg) {
      console.log(msg);
      callCb(port, msg);
  });
});

Messenger = {
  addListener,
  onTabRemoved,
  sendMessage
}
