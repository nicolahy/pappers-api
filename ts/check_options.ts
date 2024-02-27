chrome.storage.sync.get(["apiKey", "additionalFields"]).then((result: { [p: string]: any }) => {
    let message: string = '';

    if (result.apiKey) {
        message += "Current Pappers API key value : " + result.apiKey + "\n";
    } else {
        message += "Pappers API key is not defined ! Go to the options page to define it.\n";
    }

    if (result.additionalFields) {
        message += "Add additional fields : websites / email / phone (+2 🪙) ? " + result.additionalFields + "\n";
    } else {
        message += "Choice additionalFields is not defined ! Go to the options page to define it.\n";
    }

    alert(message);
});