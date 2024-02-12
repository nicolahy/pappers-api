var borderCss = "2px solid #0d46a8";
var apiKey = '';

function changePlaceholderImage() {
    let imgElement = document.querySelector("#carousel1 > div > div > img");

    if (imgElement) {
        imgElement.src = chrome.runtime.getURL("images/company_photo.png");
        imgElement.style.border = borderCss;
    } else {
        console.log("L'élément image n'a pas été trouvé.");
    }
}

changePlaceholderImage();

function findOptionValueByText(selectElement, searchText) {
    for (const option of selectElement.options) {
        if (option.text.trim() === searchText.trim()) {
            return option.value;
        }
    }
    return null;
}

function selectAddressCountry(country) {
    document.querySelectorAll("[id$='_contactAddresses_1_address_country']").forEach(element => {
        let valueForFrance = findOptionValueByText(element, country);
        if (valueForFrance !== null) {
            element.value = valueForFrance;
            element.dispatchEvent(new Event('change', {'bubbles': true}));
            let select2Container = element.closest('.select2-container') || element.nextSibling;
            if (select2Container && select2Container.classList.contains('select2-container')) {
                select2Container.style.border = borderCss;
            }
        } else {
            console.error("Option avec le texte 'France' non trouvée");
        }
    });
}

function selectLegalForm(legalForm) {
    document.querySelectorAll("select[id$='_legalFormContact']").forEach(selectElement => {
        const newOption = new Option(legalForm, legalForm, true, true);
        selectElement.appendChild(newOption);
        selectElement.dispatchEvent(new Event('change', {'bubbles': true}));
        let select2Container = selectElement.closest('.select2-container') || selectElement.nextSibling;
        if (select2Container && select2Container.classList.contains('select2-container')) {
            select2Container.style.border = borderCss;
        }
    });
}

function askForSiretAndCallApi(apiKey) {
    let siret = prompt("Veuillez entrer le SIRET de l'entreprise :");

    if (siret) {
        siret = siret.replace(/\s+/g, '');
        call_api(apiKey, siret);
    } else {
        alert("Aucun SIRET fourni. L'opération a été annulée.");
    }
}

function call_api(apiKey, siret) {
    fetch('https://api.pappers.fr/v2/entreprise?api_token=' + apiKey + '&siret= ' + siret)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {

            var element = document.querySelector("a[href='#add']");
            if (element) {
                element.click();
            }

            let fieldMappings = {
                '_siret': data.etablissement.siret,
                '_corporateNameContact': data.nom_entreprise,
                '_tvaIntracom': data.numero_tva_intracommunautaire,
                '_contactAddresses_1_address_name': data.nom_entreprise,
                '_contactAddresses_1_address_address': data.etablissement.adresse_ligne_1,
                '_contactAddresses_1_address_address2': data.etablissement.complement_adresse,
                '_contactAddresses_1_address_postalCode': data.etablissement.code_postal,
                '_contactAddresses_1_address_city': data.etablissement.ville,
                '_companyCreationDate': data.date_creation_formate,
                '_numberOfEmployees': data.effectif_max,
                '_socialCapital': data.capital,
                '_interestComment': 'Data fetched from Pappers API', // Pour les éléments textuels


                '_corporateName': data.nom_entreprise,
                '_siretNumber': data.etablissement.siret,
                '_legalForm' : data.forme_juridique,
                '_addressBilling_address': data.etablissement.adresse_ligne_1,
                '_addressBilling_address2': data.etablissement.complement_adresse,
                '_addressBilling_postalCode': data.etablissement.code_postal,
                '_addressBilling_city': data.etablissement.ville,
                '_addressSellingPoint_country': data.etablissement.pays,
                '_wCertificate': data.etablissement.siren,
                '_rcs': data.etablissement.rcs,
                '_apeCode': data.etablissement.rcs,
                '_vatNumber': data.etablissement.rcs,
                '_capitalStock': data.etablissement.rcs,
                '_activity': data.etablissement.rcs,
                '_groupCreationDate': data.etablissement.rcs,

            };

            Object.entries(fieldMappings).forEach(([suffix, value]) => {
                document.querySelectorAll(`[id$='${suffix}']`).forEach(element => {
                    if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
                        element.value = value; // Pour les champs input et select
                    } else {
                        element.textContent = value; // Pour les autres éléments, comme les divs ou spans
                    }
                    element.style.border = "2px solid #0d46a8"; // Appliquer la bordure
                });
            });

            changePlaceholderImage();
            selectAddressCountry(data.etablissement.pays);
            selectLegalForm(data.forme_juridique);
        })
        .catch(error => {
            // Error callback logic
            console.error("Request error :", error);
        });
}

chrome.storage.sync.get(["apiKey"]).then((result) => {
    if (!result.apiKey) {
        alert("Pappers API key is not defined !. Go to the options page to define it.");
    } else {
        apiKey = result.apiKey;
    }

    askForSiretAndCallApi(apiKey);
});