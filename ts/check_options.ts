chrome.storage.sync.get(["apiKey"]).then((result) => {
    if (result.apiKey) {
        alert("Current Pappers API key value : " + result.apiKey);
    } else {
        alert("Pappers API key is not defined !. Go to the options page to define it.");
    }
});