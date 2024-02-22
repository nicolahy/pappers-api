var borderCss = "2px solid #0d46a8";
var apiKey = '';

function setElementValue(element, value) {
    if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
        element.value = value;
    } else {
        element.textContent = value;
    }
    element.style.border = borderCss;
}

function selectOption(element, optionText, createIfNotExist = false) {
    let optionValue = Array.from(element.options).find(option => option.text.trim() === optionText.trim())?.value;
    if (!optionValue && createIfNotExist) {
        const newOption = new Option(optionText, optionText, true, true);
        element.appendChild(newOption);
        optionValue = newOption.value;
    }
    if (optionValue) {
        element.value = optionValue;
        element.dispatchEvent(new Event('change', {'bubbles': true}));
        const select2Container = element.closest('.select2-container') || element.nextSibling;
        if (select2Container?.classList.contains('select2-container')) {
            select2Container.style.border = borderCss;
        }
    } else {
        console.error(`Option with the text '${optionText}' not found`);
    }
}

async function fetchData(apiKey, siret) {
    const response = await fetch(`https://api.pappers.fr/v2/entreprise?api_token=${apiKey}&siret=${siret}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}

function fillFields(fieldMappings, data) {
    Object.entries(fieldMappings).forEach(([suffix, value]) => {
        document.querySelectorAll(`[id$='${suffix}']`).forEach(element => {
            setElementValue(element, value);
        });
    });
}

// Rest of the code remains the same

function changePlaceholderImage(single = true) {
    let imgElements = document.querySelectorAll("#carousel1 > div > div > img");

    if (imgElements.length > 0) {
        imgElements[0].src = chrome.runtime.getURL(`images/placeholder_1.png`);
        imgElements[0].style.border = borderCss;

        if (!single && imgElements.length > 1) {
            imgElements[1].src = chrome.runtime.getURL(`images/placeholder_2.png`);
            imgElements[1].style.border = borderCss;
        }
    } else {
        console.log(`L'élément image n'a pas été trouvé.`);
    }
}

function selectCountry(idSuffix, country) {
    document.querySelectorAll(`[id$='${idSuffix}']`).forEach(element => {
        selectOption(element, country);
    });
}

function selectLegalFormById(idSuffix, legalForm) {
    document.querySelectorAll(`select[id$='${idSuffix}']`).forEach(selectElement => {
        selectOption(selectElement, legalForm, true);
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

async function call_api(apiKey, siret) {
    try {
        const data = await fetchData(apiKey, siret);

        if (window.location.href.indexOf("admin/contact-professional/create") > -1) {
            handleContactProfessionalCreatePage(data);
        }

        if (window.location.href.match(/admin\/group\/\d+\/edit/) || window.location.href.indexOf("admin/group/create") > -1) {
            handleGroupEditOrCreatePage(data);
        }
    } catch (error) {
        console.error("Request error :", error);
    }
}

function handleContactProfessionalCreatePage(data) {
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
        '_interestComment': 'Data fetched from Pappers API ✅',
    };

    var element = document.querySelector("a[href='#add']");
    if (element) {
        element.click();
    }

    fillFields(fieldMappings, data);

    changePlaceholderImage();
    selectCountry('_contactAddresses_1_address_country', data.etablissement.pays);
    selectLegalFormById('_legalFormContact', data.forme_juridique);
}

function handleGroupEditOrCreatePage(data) {
    let fieldMappings = {
        '_corporateName': data.nom_entreprise,
        '_siretNumber': data.etablissement.siret,
        '_legalForm': data.forme_juridique,
        '_addressBilling_address': data.etablissement.adresse_ligne_1,
        '_addressBilling_address2': data.etablissement.complement_adresse,
        '_addressBilling_postalCode': data.etablissement.code_postal,
        '_addressBilling_city': data.etablissement.ville,
        '_wCertificate': data.siren,
        '_rcs': data.numero_rcs,
        '_apeCode': data.code_naf,
        '_vatNumber': data.numero_tva_intracommunautaire,
        '_capitalStock': data.capital,
        '_activity': data.etablissement.rcs,
        '_groupCreationDate': data.date_creation_formate,
    };

    fillFields(fieldMappings, data);

    changePlaceholderImage(false);
    selectCountry('_addressBilling_country', data.etablissement.pays);
    selectLegalFormById('_legalForm', data.forme_juridique);
}

chrome.storage.sync.get(["apiKey"]).then((result) => {
    if (!result.apiKey) {
        alert("Pappers API key is not defined !. Go to the options page to define it.");
    } else {
        apiKey = result.apiKey;
    }

    askForSiretAndCallApi(apiKey);
});