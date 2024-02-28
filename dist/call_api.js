(()=>{"use strict";({736:function(){var e=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(r,a){function s(e){try{l(n.next(e))}catch(e){a(e)}}function i(e){try{l(n.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(s,i)}l((n=n.apply(e,t||[])).next())}))};const t="2px solid #0d46a8";let o="";const n=e=>{if(e.length<=0)throw new Error("String length must be greater than 0");const t=e.split(" "),o=t[0]+t[1]+t[2];return`${t[3]} ${t[4]} ${o}`},r=(e,o,n=!1)=>{var r;let a=null===(r=Array.from(e.options).find((e=>e.text.trim()===o.trim())))||void 0===r?void 0:r.value;if(!a&&n){const t=new Option(o,o,!0,!0);e.appendChild(t),a=t.value}if(a){e.value=a,e.dispatchEvent(new Event("change",{bubbles:!0}));const o=e.closest(".select2-container")||e.nextSibling;(null==o?void 0:o.classList.contains("select2-container"))&&(o.style.border=t)}else console.error(`Option with the text '${o}' not found`)},a=(e,o)=>{Object.entries(e).forEach((([e,o])=>{document.querySelectorAll(`[id$='${e}']`).forEach((e=>{((e,o)=>{"INPUT"===e.tagName||"SELECT"===e.tagName?e.value=o:e.textContent=o,""!==o&&(e.style.border=t)})(e,o)}))}))},s=(e=!0)=>{let o=document.querySelectorAll("#carousel1 > div > div > img");o.length>0?(o[0].src=chrome.runtime.getURL("images/placeholder_1.png"),o[0].style.border=t,!e&&o.length>1&&(o[1].src=chrome.runtime.getURL("images/placeholder_2.png"),o[1].style.border=t)):console.log("The image element was not found.")},i=(e,t)=>{document.querySelectorAll(`[id$='${e}']`).forEach((e=>{r(e,t)}))},l=(e,t)=>{document.querySelectorAll(`select[id$='${e}']`).forEach((e=>{r(e,t,!0)}))},c=e=>{let t={_siret:e.etablissement.siret,_corporateNameContact:e.nom_entreprise,_tvaIntracom:e.numero_tva_intracommunautaire,_contactAddresses_1_address_name:e.nom_entreprise,_contactAddresses_1_address_address:e.etablissement.adresse_ligne_1,_contactAddresses_1_address_address2:e.etablissement.complement_adresse,_contactAddresses_1_address_postalCode:e.etablissement.code_postal,_contactAddresses_1_address_city:e.etablissement.ville,_companyCreationDate:e.date_creation_formate,_numberOfEmployees:e.effectif_max,_socialCapital:e.capital,_interestComment:"Data fetched from Pappers API ✅",_email:void 0!==e.email?e.email:"",_contactTelephone_phoneNumber:void 0!==e.telephone?e.telephone:""};var o=document.querySelector("a[href='#add']");o&&o.click(),a(t),s(),i("_contactAddresses_1_address_country",e.etablissement.pays),l("_legalFormContact",e.forme_juridique)},d=e=>{let t={_corporateName:e.nom_entreprise,_siretNumber:e.etablissement.siret,_legalForm:e.forme_juridique,_addressBilling_address:e.etablissement.adresse_ligne_1,_addressBilling_address2:e.etablissement.complement_adresse,_addressBilling_postalCode:e.etablissement.code_postal,_addressBilling_city:e.etablissement.ville,_wCertificate:e.siren,_rcs:n(e.numero_rcs),_apeCode:e.code_naf,_vatNumber:e.numero_tva_intracommunautaire,_capitalStock:e.capital,_activity:e.etablissement.rcs,_groupCreationDate:e.date_creation_formate,_website:void 0!==e.sites_internet?e.sites_internet.join("; "):"",_email:void 0!==e.email?e.email:"",_phoneNumber:void 0!==e.telephone?e.telephone:""};a(t),s(!1),i("_addressBilling_country",e.etablissement.pays),l("_legalForm",e.forme_juridique)};chrome.storage.sync.get(["apiKey"]).then((t=>{t.apiKey?o=t.apiKey:alert("Pappers API key is not defined !. Go to the options page to define it."),(t=>{let o=prompt("Please enter the company SIRET :");o?(o=o.replace(/\s+/g,""),((t,o)=>{e(void 0,void 0,void 0,(function*(){try{const n=yield((t,o)=>e(void 0,void 0,void 0,(function*(){let e="";"yes"===(yield chrome.storage.sync.get(["additionalFields"])).additionalFields&&(e="&champs_supplementaires=sites_internet,telephone,email");const n=yield fetch(`https://api.pappers.fr/v2/entreprise?api_token=${t}&siret=${o}${e}`);if(!n.ok)throw new Error("Network response was not ok");return yield n.json()})))(t,o);console.log(typeof n.telephone),window.location.href.indexOf("admin/contact-professional/create")>-1&&c(n),(window.location.href.match(/admin\/group\/\d+\/edit/)||window.location.href.indexOf("admin/group/create")>-1)&&d(n)}catch(e){console.error("Request error :",e)}}))})(t,o)):alert("No SIRET provided. The operation was canceled.")})(o)}))}})[736]()})();