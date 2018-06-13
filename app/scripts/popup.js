(() => {
    const dashBtn = document.querySelector('#dash-btn');

    dashBtn.addEventListener('click', (e) => {
        e.preventDefault();
        chrome.tabs.create(
            {
                url: chrome.runtime.getURL('dashboard.html')
            }, (r) => {
                console.log(r);
            }
        );
    }, false);
})();
