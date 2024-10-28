
const apiUrl = 'https://restcountries.com/v3.1/all';
const elCoumtriesList=document.querySelector(".js-country-list");
const elTemp=document.querySelector(".js-temp").content;
async function fetchCountries() {
    try {
        const response = await fetch(apiUrl);
        const countries = await response.json();
        console.log(countries);
        handleRenderCountries(countries)
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}
fetchCountries()

function handleRenderCountries(countries) {
    elCoumtriesList.innerHTML=""
    let docFragment = document.createDocumentFragment();
    countries.forEach(country => {
        let clone=elTemp.cloneNode(true);
        clone.querySelector(".js-img").src=country.flags.svg;
        clone.querySelector(".js-name").textContent=country.name.common;
        clone.querySelector(".js-population").textContent=country.population.toLocaleString();
        clone.querySelector(".js-region").textContent=country.region;
        clone.querySelector(".js-capital").textContent= typeof country.capital =="object" ?country.capital[0] : 'N/A';

        docFragment.append(clone)
    });
    elCoumtriesList.append(docFragment)
}

