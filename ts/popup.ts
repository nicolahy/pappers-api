const callApiButton: HTMLButtonElement | null = document.getElementById('call-api') as HTMLButtonElement | null;
const checkOptionsButton: HTMLButtonElement | null = document.getElementById('check-options') as HTMLButtonElement | null;

async function getCurrentTab(): Promise<chrome.tabs.Tab> {
    const queryOptions = {active: true, currentWindow: true};
    const [tab]: chrome.tabs.Tab[] = await chrome.tabs.query(queryOptions);
    return tab;
}

if (callApiButton === null || checkOptionsButton === null) {
    throw new Error("One of the buttons is null.");
}

callApiButton.addEventListener('click', async (): Promise<void> => {
    const tab: chrome.tabs.Tab = await getCurrentTab();

    if (tab && tab.id !== undefined) {
        await chrome.scripting.executeScript({
        target: {tabId: tab.id},
        files: ['dist/call_api.js']
    });
        }
});

checkOptionsButton.addEventListener('click', async (): Promise<void> => {
    const tab: chrome.tabs.Tab = await getCurrentTab();

    if (tab && tab.id !== undefined) {
        await chrome.scripting.executeScript({
            target: {tabId: tab.id},
            files: ['dist/check_options.js']
        });
    }
});