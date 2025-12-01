const countriesContainer = document.querySelector(".container-countries");
const regionCheckboxes = document.querySelectorAll("input[name='region']");


let allCountries = [];

fetch(
  "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital"
)
  .then((res) => res.json())
  .then((data) => {
    allCountries = data;
    renderCountries(allCountries);

  });

function renderCountries( countries ) {
  countriesContainer.innerHTML = "";

  countries.forEach((country) => {
      //console.log(country)
      const countryCard = document.createElement("a");
      countryCard.classList.add("country-card");
      countryCard.href = `details.html?name=${country.name.common}`;

      countryCard.innerHTML = `
            <img src="${country.flags.svg}" alt="Bandeira de ${
        country.name.common
      }">
            <div class="card-content">
                <h3 class="card-title">${country.name.common}</h3>
                <p><b>População: </b>${country.population.toLocaleString(
                  "pt-BR"
                )}</p>
                <p><b>Continente: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital?.[0] || "Indisponível"}</p>
            </div>
        `;
      countriesContainer.append(countryCard);
    });
  }

regionCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", (applyFilters));
});

function applyFilters() {
  const selectedRegions = Array.from(regionCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  const filteredCountries = allCountries.filter((country) => { //isso aqui tá muito feio Meu Deus
    if (selectedRegions.length === 0) return true;
    return selectedRegions.includes(country.region);
  });
  renderCountries(filteredCountries);
}