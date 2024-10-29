
// const apiUrl = 'https://restcountries.com/v3.1/all';
// const elCountriesList = document.querySelector(".js-country-list");
// const elTemp = document.querySelector(".js-temp").content;
// const modal = document.querySelector(".js-country-modal");
// const close = document.querySelector(".js-close");

// async function fetchCountries() {
//     try {
//         const response = await fetch(apiUrl);
//         const countries = await response.json();

//         handleRenderCountries(countries);
//     } catch (error) {
//         console.error('Error fetching countries:', error);
//     }
// }

// fetchCountries();

// function handleRenderCountries(countries) {
//     elCountriesList.innerHTML = "";
//     let docFragment = document.createDocumentFragment();
//     countries.forEach(country => {
//         let clone = elTemp.cloneNode(true);
//         clone.querySelector(".js-img").src = country.flags.svg;
//         clone.querySelector(".js-name").textContent = country.name.common;
//         clone.querySelector(".js-population").textContent = country.population.toLocaleString();
//         clone.querySelector(".js-region").textContent = country.region;
//         clone.querySelector(".js-capital").textContent = Array.isArray(country.capital) ? country.capital[0] : 'N/A';
//         clone.querySelector(".js-country-card").dataset.id = country.name.common;
//         docFragment.append(clone);
//     });
//     elCountriesList.append(docFragment);
// }

// elCountriesList.addEventListener("click", (evt) => {
//     let countryCard = evt.target.closest(".js-country-card");
//     if (!countryCard) return;

//     let name = countryCard.dataset.id;
//     const apiUrlCountry = `https://restcountries.com/v3.1/name/${name}`;

//     modal.style.display = 'flex';

//     async function fetchCountryDetails() {
//         try {
//             const response = await fetch(apiUrlCountry);
//             const [country] = await response.json();
//             handleRenderModal(country);
//         } catch (error) {
//             console.error('Error fetching country details:', error);
//         }
//     }

//     fetchCountryDetails();
// });

// close.addEventListener("click", () => {
//     modal.style.display = 'none';
// });

// function handleRenderModal(country) {

//     modal.querySelector(".js-img").src = country.flags.svg;
//     modal.querySelector(".js-name").textContent = country.name.common;
//     modal.querySelector(".js-native").textContent = country.name.nativeName ? Object.values(country.name.nativeName)[0].common : 'N/A';
//     modal.querySelector(".js-population").textContent = country.population.toLocaleString();
//     modal.querySelector(".js-region").textContent = country.region || 'N/A';
//     modal.querySelector(".js-subregion").textContent = country.subregion || 'N/A';
//     modal.querySelector(".js-capital").textContent = Array.isArray(country.capital) ? country.capital[0] : 'N/A';
//     modal.querySelector(".js-domain").textContent = country.tld ? country.tld[0] : 'N/A';
//     modal.querySelector(".js-currency").textContent = country.currencies ? Object.values(country.currencies).map(currency => currency.name).join(', ') : 'N/A';
//     modal.querySelector(".js-language").textContent = country.languages ? Object.values(country.languages).slice(0,3).join(', ') : 'N/A';
//     modal.querySelector(".js-borders").textContent = country.borders ? country.borders.join(', ') : 'N/A';
// }

const apiUrl = 'https://restcountries.com/v3.1/all';
const elCountriesList = document.querySelector(".js-country-list");
const elTemp = document.querySelector(".js-temp").content;
const modal = document.querySelector(".js-country-modal");
const close = document.querySelector(".js-close");
const loadingMessage = document.querySelector(".js-loading-message"); // Loading element

async function fetchCountries() {
    try {
        const response = await fetch(apiUrl);
        const countries = await response.json();
        handleRenderCountries(countries);
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

fetchCountries();

function handleRenderCountries(countries) {
    elCountriesList.innerHTML = "";
    let docFragment = document.createDocumentFragment();
    countries.forEach(country => {
        let clone = elTemp.cloneNode(true);
        clone.querySelector(".js-img").src = country.flags.svg;
        clone.querySelector(".js-name").textContent = country.name.common;
        clone.querySelector(".js-population").textContent = country.population.toLocaleString();
        clone.querySelector(".js-region").textContent = country.region;
        clone.querySelector(".js-capital").textContent = Array.isArray(country.capital) ? country.capital[0] : 'N/A';
        clone.querySelector(".js-country-card").dataset.id = country.name.common;
        docFragment.append(clone);
    });
    elCountriesList.append(docFragment);
}

elCountriesList.addEventListener("click", (evt) => {
    let countryCard = evt.target.closest(".js-country-card");
    if (!countryCard) return;

    let name = countryCard.dataset.id;
    const apiUrlCountry = `https://restcountries.com/v3.1/name/${name}`;

    loadingMessage.style.display = 'block'; // Show loading message
    modal.querySelector(".js-img").src=""
    modal.querySelector(".js-name").textContent=""
    modal.querySelector(".js-native").textContent ="";
    modal.querySelector(".js-population").textContent="";
    modal.querySelector(".js-region").textContent= "";
    modal.querySelector(".js-subregion").textContent= "";
    modal.querySelector(".js-capital").textContent= "";
    modal.querySelector(".js-domain").textContent = "";
    modal.querySelector(".js-currency").textContent="";
    modal.querySelector(".js-language").textContent= "";
    modal.querySelector(".js-borders").textContent= "";
    modal.style.display = 'flex'; // Show modal, but with loading state
    modal.querySelector(".modal-content").style.display="none"
    async function fetchCountryDetails() {
        try {
            const response = await fetch(apiUrlCountry);
            const [country] = await response.json();
            handleRenderModal(country);
        } catch (error) {
            console.error('Error fetching country details:', error);
        } finally {
            loadingMessage.style.display = 'none'; // Hide loading message
            modal.querySelector(".modal-content").style.display="block"
        }
    }

    fetchCountryDetails();
});

close.addEventListener("click", () => {
    modal.style.display = 'none';
});

function handleRenderModal(country) {
    modal.querySelector(".js-img").src = country.flags.svg;
    modal.querySelector(".js-name").textContent = country.name.common;
    modal.querySelector(".js-native").textContent = country.name.nativeName ? Object.values(country.name.nativeName)[0].common : 'N/A';
    modal.querySelector(".js-population").textContent = country.population.toLocaleString();
    modal.querySelector(".js-region").textContent = country.region || 'N/A';
    modal.querySelector(".js-subregion").textContent = country.subregion || 'N/A';
    modal.querySelector(".js-capital").textContent = Array.isArray(country.capital) ? country.capital[0] : 'N/A';
    modal.querySelector(".js-domain").textContent = country.tld ? country.tld[0] : 'N/A';
    modal.querySelector(".js-currency").textContent = country.currencies ? Object.values(country.currencies).map(currency => currency.name).join(', ') : 'N/A';
    modal.querySelector(".js-language").textContent = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
    modal.querySelector(".js-borders").textContent = country.borders ? country.borders.join(', ') : 'N/A';
}
