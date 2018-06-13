let dashboardOpen = false;
const actionsHandler = {
    'openDashboard' : openDashBoard,
    'closeDashBoard' : closeDashBoard
};


browser.extension.onConnect.addListener(function(port) {
    console.log("Connected .....");

    port.onMessage.addListener(function(msg) {
        console.log(`Message recieved : ${msg}`);
        if (actionsHandler[msg.action]){
            actionsHandler[msg.action]();
        }
    });
});

browser.runtime.onInstalled.addListener((details) => {
    console.log('previousVersion', details.previousVersion)
});

// browser.browserAction.setBadgeText({
//     text: `'Allo`
// });

// Open dashboard
function openDashBoard() {
    if(!dashboardOpen){
        browser.tabs.create(
            {
                url: browser.runtime.getURL('dashboard.html')
            }
        );
        dashboardOpen = true;
    }
};

function closeDashBoard(){
    dashboardOpen = false;
}

console.log(`'Allo 'Allo! Event Page for Browser Action`);
