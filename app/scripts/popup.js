(() => {
    const dashBtn = document.querySelector('#dash-btn');
    const port = browser.extension.connect({
        name: "deep-communication"
    });

    // Dashboard open
    dashBtn.addEventListener('click', (e) => {
        e.preventDefault();
        port.postMessage({ action : 'openDashboard'});
        console.log('message sent');
    }, false);



    port.onMessage.addListener(function(msg) {
        console.log("message recieved" + msg);
    });
})();
