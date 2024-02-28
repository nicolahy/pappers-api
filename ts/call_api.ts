const borderCss: string = '2px solid #0d46a8';
let apiKey: string = '';

type PappersData = {
    nom_entreprise: string,
    siren: string,
    forme_juridique: string,
    numero_rcs: string,
    code_naf: string,
    numero_tva_intracommunautaire: string,
    capital: string,
    date_creation_formate: string,
    effectif_max: string,
    etablissement: {
        siret: string,
        adresse_ligne_1: string,
        complement_adresse: string,
        code_postal: string,
        ville: string,
        pays: string,
        rcs: string
    },
    sites_internet: string[],
    email: string,
    telephone: string,
};

const convertRcsString = (rcsString: string): string => {
    if (rcsString.length <= 0) {
        throw new Error("String length must be greater than 0");
    }

    const parts: string[] = rcsString.split(' ');
    const number: string = parts[0] + parts[1] + parts[2];
    const rcs: string = parts[3];
    const city: string = parts[4];

    return `${rcs} ${city} ${number}`;
}

const setElementValue = (element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, value: string) => {
    if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
        element.value = value;
    } else {
        element.textContent = value;
    }

    if (value !== '') {
        element.style.border = borderCss;
    }
}

const selectOption = (element: HTMLSelectElement, optionText: string, createIfNotExist: boolean = false) => {
    let optionValue: string | undefined = Array.from(element.options).find(option => option.text.trim() === optionText.trim())?.value;
    if (!optionValue && createIfNotExist) {
        const newOption: HTMLOptionElement = new Option(optionText, optionText, true, true);
        element.appendChild(newOption);
        optionValue = newOption.value;
    }
    if (optionValue) {
        element.value = optionValue;
        element.dispatchEvent(new Event('change', {'bubbles': true}));
        const select2Container: HTMLElement | null = (element.closest('.select2-container') || element.nextSibling) as HTMLElement;
        if (select2Container?.classList.contains('select2-container')) {
            select2Container.style.border = borderCss;
        }
    } else {
        console.error(`Option with the text '${optionText}' not found`);
    }
}

const fetchData = async (apiKey: string, siret: string): Promise<any> => {
    let additionalFields: string = '';
    const result: { [p: string]: any } = await chrome.storage.sync.get(["additionalFields"]);
    if (result.additionalFields === 'yes') {
        additionalFields = '&champs_supplementaires=sites_internet,telephone,email';
    }

    const response: Response = await fetch(`https://api.pappers.fr/v2/entreprise?api_token=${apiKey}&siret=${siret}${additionalFields}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return await response.json();
}

const fillFields = (fieldMappings: { [s: string]: string; }, data: PappersData): void => {
    Object.entries(fieldMappings).forEach(([suffix, value]): void => {
        document.querySelectorAll(`[id$='${suffix}']`).forEach(element => {
            setElementValue(element as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, value);
        });
    });
}

const changePlaceholderImage = (single = true): void => {
    let imgElements: NodeListOf<HTMLImageElement> = document.querySelectorAll("#carousel1 > div > div > img");

    if (imgElements.length > 0) {
        imgElements[0].src = chrome.runtime.getURL(`images/placeholder_1.png`);
        imgElements[0].style.border = borderCss;

        if (!single && imgElements.length > 1) {
            imgElements[1].src = chrome.runtime.getURL(`images/placeholder_2.png`);
            imgElements[1].style.border = borderCss;
        }
    } else {
        console.log('The image element was not found.');
    }
}

const selectCountry = (idSuffix: string, country: string): void => {
    document.querySelectorAll(`[id$='${idSuffix}']`).forEach(selectElement => {
        selectOption(selectElement as HTMLSelectElement, country);
    });
}

const selectLegalFormById = (idSuffix: string, legalForm: string): void => {
    document.querySelectorAll(`select[id$='${idSuffix}']`).forEach(selectElement => {
        selectOption(selectElement as HTMLSelectElement, legalForm, true);
    });
}

const askForSiretAndCallApi = (apiKey: string): void => {
    let siret = prompt("Please enter the company SIRET :");

    if (siret) {
        siret = siret.replace(/\s+/g, '');
        call_api(apiKey, siret);
    } else {
        alert("No SIRET provided. The operation was canceled.");
    }
}

const call_api = async (apiKey: string, siret: string): Promise<void> => {
    try {
        const data = await fetchData(apiKey, siret);

        console.log(typeof data.telephone);

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

const handleContactProfessionalCreatePage = (data: PappersData): void => {
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
        '_email': data.email !== undefined ? data.email : '',
        '_contactTelephone_phoneNumber': data.telephone !== undefined ? data.telephone : '',
    };

    var element: HTMLElement | null = document.querySelector("a[href='#add']");
    if (element) {
        element.click();
    }

    fillFields(fieldMappings, data);

    changePlaceholderImage();
    selectCountry('_contactAddresses_1_address_country', data.etablissement.pays);
    selectLegalFormById('_legalFormContact', data.forme_juridique);
}

const handleGroupEditOrCreatePage = (data: PappersData): void => {
    let fieldMappings = {
        '_corporateName': data.nom_entreprise,
        '_siretNumber': data.etablissement.siret,
        '_legalForm': data.forme_juridique,
        '_addressBilling_address': data.etablissement.adresse_ligne_1,
        '_addressBilling_address2': data.etablissement.complement_adresse,
        '_addressBilling_postalCode': data.etablissement.code_postal,
        '_addressBilling_city': data.etablissement.ville,
        '_wCertificate': data.siren,
        '_rcs': convertRcsString(data.numero_rcs),
        '_apeCode': data.code_naf,
        '_vatNumber': data.numero_tva_intracommunautaire,
        '_capitalStock': data.capital,
        '_activity': data.etablissement.rcs,
        '_groupCreationDate': data.date_creation_formate,
        '_website': data.sites_internet !== undefined ? data.sites_internet.join('; ') : '',
        '_email': data.email !== undefined ? data.email : '',
        '_phoneNumber': data.telephone !== undefined ? data.telephone : '',
    };

    fillFields(fieldMappings, data);

    changePlaceholderImage(false);
    selectCountry('_addressBilling_country', data.etablissement.pays);
    selectLegalFormById('_legalForm', data.forme_juridique);
}

chrome.storage.sync.get(["apiKey"]).then((result: { [p: string]: any }): void => {
    if (!result.apiKey) {
        alert("Pappers API key is not defined !. Go to the options page to define it.");
    } else {
        apiKey = result.apiKey;
    }

    askForSiretAndCallApi(apiKey);
});