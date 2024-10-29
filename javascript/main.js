const apiUrl = 'https://restcountries.com/v3.1/all';
const elCountriesList = document.querySelector(".js-country-list");
const elTemp = document.querySelector(".js-temp").content;
const modal = document.querySelector(".js-country-modal");
const close = document.querySelector(".js-close");
const region = document.querySelector(".js-region-filter");
const elSortSelect = document.querySelector(".js-sort-select");
const paginationControls = document.querySelector(".js-pagination-controls");
const filterInput = document.querySelector(".js-filter-input");
const itemsPerPage = 50;
let currentPage = 1;
let countriesData = [];
let filteredCountriesData = [];

const sortCountries = {
    ["a-z"]: (a, b) => a.name.common.localeCompare(b.name.common),
    ["z-a"]: (a, b) => b.name.common.localeCompare(a.name.common),
    ["lot-few"]: (a, b) => b.population - a.population,
    ["few-lot"]: (a, b) => a.population - b.population
};

async function fetchCountries() {
    try {
        const response = await fetch(apiUrl);
        countriesData = await response.json();
        filteredCountriesData = countriesData;
        renderPagination();
        renderCurrentPage();
    } catch (error) {
        console.error('Mamlakatlar maʼlumotini olishda xatolik yuz berdi:', error);
    }
}

fetchCountries();
function isNumber(value) {
    return !isNaN(value);
}
function renderCurrentPage() {
    elCountriesList.innerHTML = "";
    const dataToRender = filteredCountriesData.length ? filteredCountriesData : countriesData;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = dataToRender.slice(startIndex, endIndex);

    currentItems.forEach(country => {
        const filterValue = filterInput.value.toLowerCase();
        let regName= new RegExp(filterValue,"gi")
        let clone = elTemp.cloneNode(true);
        let population=clone.querySelector(".js-population");
        let name=clone.querySelector(".js-name");
        const populationText = country.population.toLocaleString();
        const nameText=country.name.common;
        if (regName && regName.source != "(?:)"&&isNumber(filterValue)) {
           
            
           population.innerHTML=populationText.replace(regName,(match)=>{
            return `<mark>${match}</mark>`
           })
            
        } else {
            clone.querySelector(".js-population").textContent = country.population.toLocaleString();
        }
        if (regName && regName.source != "(?:)"&&!isNumber(filterValue)) {
           
            
           name.innerHTML=nameText.replace(regName,(match)=>{
            return `<mark>${match}</mark>`
           })
            
        } else {
            clone.querySelector(".js-name").textContent = country.name.common;
        }

        
      
        clone.querySelector(".js-img").src = country.flags.svg;
        clone.querySelector(".js-region").textContent = country.region;
        clone.querySelector(".js-capital").textContent = Array.isArray(country.capital) ? country.capital[0] : 'N/A';
        clone.querySelector(".js-country-card").dataset.id = country.name.common;
        elCountriesList.appendChild(clone);
    });
}

function renderPagination() {
    paginationControls.innerHTML = "";
    const dataToRender = filteredCountriesData.length ? filteredCountriesData : countriesData;
    const totalPages = Math.ceil(dataToRender.length / itemsPerPage);

    const prevButton = document.createElement("button");
    prevButton.textContent = "Orqaga";
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => {
        currentPage--;
        renderCurrentPage();
        renderPagination();
    });
    paginationControls.appendChild(prevButton);

    const nextButton = document.createElement("button");
    nextButton.textContent = "Keyingi";
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener("click", () => {
        currentPage++;
        renderCurrentPage();
        renderPagination();
    });
    paginationControls.appendChild(nextButton);
}
function sort(evt) {
    let res =filteredCountriesData.sort(sortCountries[elSortSelect.value]);
    renderCurrentPage(res)
    
}
function applyFilters() {
    const filterValue = filterInput.value.toLowerCase();
    let regName= new RegExp(filterValue,"gi")
    const regionValue = region.value;
    let reg= new RegExp(regionValue,"gi")
    filteredCountriesData = countriesData
        .filter(country =>
            (isNumber(filterValue)==true?(filterValue==""||country.population.toLocaleString().match(regName)):(filterValue === "" || country.name.common.toLowerCase().match(regName))) &&
            (regionValue === "Filter by region" || country.region.match(reg))
        ).sort(
            sortCountries[elSortSelect.value]
        )
        
        
        currentPage = 1;
        renderPagination();
        renderCurrentPage();
    }
    
    filterInput.addEventListener("input", applyFilters);
    region.addEventListener("change", applyFilters);
    elSortSelect.addEventListener("change",sort)


elCountriesList.addEventListener("click", (evt) => {
    let countryCard = evt.target.closest(".js-country-card");
    if (!countryCard) return;

    let name = countryCard.dataset.id;
    const apiUrlCountry = `https://restcountries.com/v3.1/name/${name}`;
    modal.style.display = 'flex';
    modal.querySelector(".modal-content").style.display = "none";

    async function fetchCountryDetails() {
        try {
            const response = await fetch(apiUrlCountry);
            const [country] = await response.json();
            handleRenderModal(country);
        } catch (error) {
            console.error('Mamlakat tafsilotlarini olishda xatolik:', error);
        } finally {
            modal.querySelector(".modal-content").style.display = "block";
        }
    }

    fetchCountryDetails();
});

close.addEventListener("click", () => {
    modal.style.display = 'none';
    modal.querySelector(".js-img").src = "";
    modal.querySelector(".js-name").textContent = "";
    modal.querySelector(".js-native").textContent = "";
    modal.querySelector(".js-population").textContent = "";
    modal.querySelector(".js-region").textContent = "";
    modal.querySelector(".js-subregion").textContent = "";
    modal.querySelector(".js-capital").textContent = "";
    modal.querySelector(".js-domain").textContent = "";
    modal.querySelector(".js-currency").textContent = "";
    modal.querySelector(".js-language").textContent = "";
    modal.querySelector(".js-borders").textContent = "";
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
const darkModeToggle = document.querySelector(".js-dark-mode-toggle");

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");


    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
        darkModeToggle.textContent = "Light Mode"; 
    } else {
        localStorage.setItem("darkMode", "disabled");
        darkModeToggle.textContent = "Dark Mode";
    }
});

if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    darkModeToggle.textContent = "Light Mode";
}
