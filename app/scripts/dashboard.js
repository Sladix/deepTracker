// Dashboard
let dashboardOpen = false;

// Open dashboard
function openDashboard() {
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
function closeDashboard(tabId, removeInfo){
    if(tabId === dashboardOpen.id)
    {
        dashboardOpen = false;
    }
}

const actionsHandlers = {
  openDashboard
};

Messenger.addListener(actionsHandlers);
Messenger.onTabRemoved(closeDashboard);
console.log("okdash");
