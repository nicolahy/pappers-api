(()=>{"use strict";document.addEventListener("DOMContentLoaded",(()=>{chrome.storage.sync.get({apiKey:"XXX"},(e=>{const t=document.getElementById("apiKey");t&&(t.value=e.apiKey)}))}));const e=document.getElementById("save");e&&e.addEventListener("click",(()=>{const e=document.getElementById("apiKey");if(null===e)return;const t=e.value;chrome.storage.sync.set({apiKey:t},(()=>{const e=document.getElementById("status");null!==e&&(e.textContent="Options saved.",setTimeout((()=>{e.textContent=""}),750))}))}))})();