(()=>{"use strict";document.addEventListener("DOMContentLoaded",(()=>{chrome.storage.sync.get({apiKey:"XXX",additionalFields:"no"},(e=>{const t=document.getElementById("apiKey"),n=document.getElementById("additionalFields");t&&(t.value=e.apiKey),n&&(n.value=e.additionalFields)}))}));const e=document.getElementById("save");e&&e.addEventListener("click",(()=>{const e=document.getElementById("apiKey"),t=document.getElementById("additionalFields");if(null===e||null===t)return;const n=e.value,d=t.value;chrome.storage.sync.set({apiKey:n,additionalFields:d},(()=>{const e=document.getElementById("status");null!==e&&(e.textContent="Options saved.",setTimeout((()=>{e.textContent=""}),750))}))}))})();