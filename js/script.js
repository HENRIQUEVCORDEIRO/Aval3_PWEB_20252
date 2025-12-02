import { isFavorite, toggleFavorite } from "./favorites.js";

const countriesContainer = document.querySelector(".container-countries");
const regionCheckboxes = document.querySelectorAll("input[name='region']");
const searchInput = document.querySelector(".search-container input");
const filterBtn = document.getElementById("filter-btn");
const filterOptions = document.getElementById("filter-options");

let allCountries;

fetch(
  "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital"
)
  .then((res) => res.json())
  .then((data) => {
    allCountries = data;
    renderCountries(data);
  });

filterBtn.addEventListener("click", (e) => {
  e.stopPropagation(); 
  filterOptions.classList.toggle("hidden");
});

document.addEventListener("click", (e) => {
  if (!filterOptions.contains(e.target) && e.target !== filterBtn) {
    filterOptions.classList.add("hidden");
  }
});

function filterData() {
  const searchTerm = searchInput.value.toLowerCase();

  const selectedRegions = Array.from(regionCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);
  
  const filteredCountries = allCountries.filter((country) => {
    const matchesSearch = country.name.common.toLowerCase().includes(searchTerm);
    const matchesRegion = selectedRegions.length === 0 || selectedRegions.includes(country.region);
    return matchesSearch && matchesRegion;
  });

  renderCountries(filteredCountries);
}

searchInput.addEventListener("input", filterData);
regionCheckboxes.forEach((checkbox) =>
  checkbox.addEventListener("change", filterData)
);

function renderCountries(countries) {
  countriesContainer.innerHTML = "";

  countries.forEach((country) => {
    //console.log(country)
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `details.html?name=${country.name.common}`;

    const isFav = isFavorite(country.name.common);

    const favoriteClass = isFav ? " favorite" : "";
    const heartIcon = isFav ? "&#10084;" : "&#9825;";

    countryCard.innerHTML = `
        <div class="favorite-icon${favoriteClass}">${heartIcon}</div>
            <img src="${country.flags.svg}" alt="Bandeira de ${country.name.common
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

    const btnFav = countryCard.querySelector(".favorite-icon");
    btnFav.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const added = toggleFavorite(country);  
      if (added) {
        btnFav.classList.add("favorite");
        btnFav.innerHTML = "&#10084;"; // coração cheio
      } else {
        btnFav.classList.remove("favorite");
        btnFav.innerHTML = "&#9825;"; // coração vazio
      }
    });
    countriesContainer.append(countryCard);
  });
}
