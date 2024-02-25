const saveOptions = () => {
    const inputElement: HTMLInputElement | null = document.getElementById('apiKey') as HTMLInputElement | null;

    if (inputElement === null) {
        return;
    }

    const apiKey: string = inputElement.value;

    chrome.storage.sync.set({apiKey: apiKey}, () => {
            const status: HTMLElement | null = document.getElementById('status');

            if (status === null) {
                return;
            }

            status.textContent = 'Options saved.';
            setTimeout(() => {
                status.textContent = '';
            }, 750);
        }
    );
};

const restoreOptions = () => {
    chrome.storage.sync.get({apiKey: 'XXX'}, (items: { [p: string]: any }): void => {
            const apiKeyElement: HTMLInputElement | null = document.getElementById('apiKey') as HTMLInputElement | null;
            if (apiKeyElement) {
                apiKeyElement.value = items.apiKey;
            }
        }
    );
};

document.addEventListener('DOMContentLoaded', restoreOptions);

const saveElement: HTMLButtonElement | null = document.getElementById('save') as HTMLButtonElement | null
if (saveElement) {
    saveElement.addEventListener('click', saveOptions);
}