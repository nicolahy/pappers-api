const callApiButton = document.getElementById('call-api');
const checkOptionsButton = document.getElementById('check-options');

async function getCurrentTab() {
    const queryOptions = {active: true, currentWindow: true};
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

callApiButton.addEventListener('click', async () => {
    const tab = await getCurrentTab();

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['js/call_api.js']
    });
});

checkOptionsButton.addEventListener('click', async () => {
    const tab = await getCurrentTab();

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['js/check_options.js']
    });
});