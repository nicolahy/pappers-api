const saveOptions = () => {
    const apiKey = document.getElementById('apiKey').value;

    chrome.storage.sync.set({apiKey: apiKey}, () => {
            const status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(() => {
                status.textContent = '';
            }, 750);
        }
    );
};

const restoreOptions = () => {
    chrome.storage.sync.get({apiKey: 'XXX'}, (items) => {
            document.getElementById('apiKey').value = items.apiKey;
        }
    );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);