const injectFile = document.getElementById('call-api');
const injectFunction = document.getElementById('check-options');

async function getCurrentTab() {
    const queryOptions = {active: true, currentWindow: true};
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

injectFile.addEventListener('click', async () => {
    const tab = await getCurrentTab();

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['js/call_api.js']
    });
});

injectFunction.addEventListener('click', async () => {
    const tab = await getCurrentTab();

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['js/check_options.js']
    });
});