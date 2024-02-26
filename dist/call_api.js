(()=>{"use strict";({736:function(){var e=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(r,a){function s(e){try{l(o.next(e))}catch(e){a(e)}}function i(e){try{l(o.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,i)}l((o=o.apply(e,t||[])).next())}))};const t="2px solid #0d46a8";let n="";const o=e=>{if(e.length<=0)throw new Error("String length must be greater than 0");const t=e.split(" "),n=t[0]+t[1]+t[2];return`${t[3]} ${t[4]} ${n}`},r=(e,n,o=!1)=>{var r;let a=null===(r=Array.from(e.options).find((e=>e.text.trim()===n.trim())))||void 0===r?void 0:r.value;if(!a&&o){const t=new Option(n,n,!0,!0);e.appendChild(t),a=t.value}if(a){e.value=a,e.dispatchEvent(new Event("change",{bubbles:!0}));const n=e.closest(".select2-container")||e.nextSibling;(null==n?void 0:n.classList.contains("select2-container"))&&(n.style.border=t)}else console.error(`Option with the text '${n}' not found`)},a=(e,n)=>{Object.entries(e).forEach((([e,n])=>{document.querySelectorAll(`[id$='${e}']`).forEach((e=>{((e,n)=>{"INPUT"===e.tagName||"SELECT"===e.tagName?e.value=n:e.textContent=n,e.style.border=t})(e,n)}))}))},s=(e=!0)=>{let n=document.querySelectorAll("#carousel1 > div > div > img");n.length>0?(n[0].src=chrome.runtime.getURL("images/placeholder_1.png"),n[0].style.border=t,!e&&n.length>1&&(n[1].src=chrome.runtime.getURL("images/placeholder_2.png"),n[1].style.border=t)):console.log("The image element was not found.")},i=(e,t)=>{document.querySelectorAll(`[id$='${e}']`).forEach((e=>{r(e,t)}))},l=(e,t)=>{document.querySelectorAll(`select[id$='${e}']`).forEach((e=>{r(e,t,!0)}))},c=e=>{let t={_siret:e.etablissement.siret,_corporateNameContact:e.nom_entreprise,_tvaIntracom:e.numero_tva_intracommunautaire,_contactAddresses_1_address_name:e.nom_entreprise,_contactAddresses_1_address_address:e.etablissement.adresse_ligne_1,_contactAddresses_1_address_address2:e.etablissement.complement_adresse,_contactAddresses_1_address_postalCode:e.etablissement.code_postal,_contactAddresses_1_address_city:e.etablissement.ville,_companyCreationDate:e.date_creation_formate,_numberOfEmployees:e.effectif_max,_socialCapital:e.capital,_interestComment:"Data fetched from Pappers API ✅",_email:e.email,_contactTelephone_phoneNumber:e.telephone};var n=document.querySelector("a[href='#add']");n&&n.click(),a(t),s(),i("_contactAddresses_1_address_country",e.etablissement.pays),l("_legalFormContact",e.forme_juridique)},d=e=>{let t={_corporateName:e.nom_entreprise,_siretNumber:e.etablissement.siret,_legalForm:e.forme_juridique,_addressBilling_address:e.etablissement.adresse_ligne_1,_addressBilling_address2:e.etablissement.complement_adresse,_addressBilling_postalCode:e.etablissement.code_postal,_addressBilling_city:e.etablissement.ville,_wCertificate:e.siren,_rcs:o(e.numero_rcs),_apeCode:e.code_naf,_vatNumber:e.numero_tva_intracommunautaire,_capitalStock:e.capital,_activity:e.etablissement.rcs,_groupCreationDate:e.date_creation_formate,_website:e.sites_internet.join("; "),_email:e.email,_phoneNumber:void 0!==typeof e.telephone?e.telephone:""};a(t),s(!1),i("_addressBilling_country",e.etablissement.pays),l("_legalForm",e.forme_juridique)};chrome.storage.sync.get(["apiKey"]).then((t=>{t.apiKey?n=t.apiKey:alert("Pappers API key is not defined !. Go to the options page to define it."),(t=>{let n=prompt("Please enter the company SIRET:");n?(n=n.replace(/\s+/g,""),((t,n)=>{e(void 0,void 0,void 0,(function*(){try{const o=yield((t,n)=>e(void 0,void 0,void 0,(function*(){let e="";"yes"===(yield chrome.storage.sync.get(["additionalFields"])).additionalFields&&(e="&champs_supplementaires=sites_internet,telephone,email");const o=yield fetch(`https://api.pappers.fr/v2/entreprise?api_token=${t}&siret=${n}${e}`);if(!o.ok)throw new Error("Network response was not ok");return yield o.json()})))(t,n);window.location.href.indexOf("admin/contact-professional/create")>-1&&c(o),(window.location.href.match(/admin\/group\/\d+\/edit/)||window.location.href.indexOf("admin/group/create")>-1)&&d(o)}catch(e){console.error("Request error :",e)}}))})(t,n)):alert("No SIRET provided. The operation was canceled.")})(n)}))}})[736]()})();