let dashboardOpen = false;
const actionsHandler = {
    'openDashboard' : openDashBoard,
    'closeDashBoard' : closeDashBoard
};

// browser.browserAction.setBadgeText({
//     text: `'Allo`
// });

// Messages handling
browser.extension.onConnect.addListener(function(port) {
    console.log("Connected .....");

    port.onMessage.addListener(function(msg) {
        console.log(`Message recieved :`, msg);
        if (actionsHandler[msg.action]){
            actionsHandler[msg.action]();
        }
    });
});

browser.runtime.onInstalled.addListener((details) => {
    console.log('previousVersion', details.previousVersion)
});

// Open dashboard
function openDashBoard() {
    if(!dashboardOpen){
        browser.tabs.create({
            url: browser.runtime.getURL('dashboard.html')
        }).then((tab) => {
            dashboardOpen = tab;
        });
    }else{
        browser.tabs.get(dashboardOpen.id).then((tab)=>{
            browser.tabs.highlight({'tabs': tab.index});
        });
    }
};

// Close dashboard
browser.tabs.onRemoved.addListener(closeDashBoard);

function closeDashBoard(tabId, removeInfo){
    if(tabId === dashboardOpen.id)
    {
        dashboardOpen = false;
    }
}

console.log(`'Allo 'Allo! Event Page for Browser Action`);
