chrome.storage.sync.get(["apiKey"]).then((result: { [p: string]: any }) => {
    if (result.apiKey) {
        alert("Current Pappers API key value : " + result.apiKey);
    } else {
        alert("Pappers API key is not defined !. Go to the options page to define it.");
    }
});