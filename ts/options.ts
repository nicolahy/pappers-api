import '98.css';

function saveOptions(this: HTMLButtonElement): void {
    const apiKeyElement: HTMLInputElement | null = document.getElementById('apiKey') as HTMLInputElement | null;
    const additionalFieldsElement: HTMLSelectElement | null = document.getElementById('additionalFields') as HTMLSelectElement | null;

    if (apiKeyElement === null || additionalFieldsElement === null) {
        return;
    }

    const apiKey: string = apiKeyElement.value;
    const additionalFields: string = additionalFieldsElement.value;

    const originalText = this.textContent;

    chrome.storage.sync.set({apiKey: apiKey, additionalFields: additionalFields}, (): void => {
        this.textContent = 'OK!';

        setTimeout((): void => {
            this.textContent = originalText;
            this.blur();
        }, 750);
    })
}

const restoreOptions = (): void => {
    chrome.storage.sync.get({apiKey: 'XXX', additionalFields: 'no'}, (items: { [p: string]: any }): void => {
        const apiKeyElement: HTMLInputElement | null = document.getElementById('apiKey') as HTMLInputElement | null;
        const additionalFieldsElement: HTMLSelectElement | null = document.getElementById('additionalFields') as HTMLSelectElement | null;

        if (apiKeyElement) {
            apiKeyElement.value = items.apiKey;
        }

        if (additionalFieldsElement) {
            additionalFieldsElement.value = items.additionalFields;
        }
    });
};
document.addEventListener('DOMContentLoaded', restoreOptions);

const saveElement: HTMLButtonElement | null = document.getElementById('save') as HTMLButtonElement | null
if (saveElement) {
    saveElement.addEventListener('click', saveOptions.bind(saveElement));
}