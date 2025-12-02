const countriesContainer = document.querySelector(".container-countries");
const regionCheckboxes = document.querySelectorAll("input[name='region']");
const searchInput = document.querySelector(".search-container input");

let allCountries;

fetch(
  "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital"
)
  .then((res) => res.json())
  .then((data) => {
    allCountries = data;
    renderCountries(data);
  });

function getFavorites() {
  return JSON.parse(localStorage.getItem("favoriteCountries")) || [];
}

function isFavorite(countryName) {
  const favorites = getFavorites();
  return favorites.some(
    (country) => country.name.common === countryName
  );
}

function renderCountries(countries) {
  countriesContainer.innerHTML = "";

  countries.forEach((country) => {
    //console.log(country)
    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `details.html?name=${country.name.common}`;

    const favoriteClass = isFavorite(country.name.common) ? " favorite" : "";
    const heartIcon = isFavorite(country.name.common)
      ? "&#10084;" // coração cheio
      : "&#9825;"; // coração vazio

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

      toggleHomeFavorite(country, btnFav);
    });
    countriesContainer.append(countryCard);
  });
}

function toggleHomeFavorite(coutry, buttonElement) {
  let favorites = getFavorites();
  const index = favorites.findIndex(
    (fav) => fav.name.common === coutry.name.common
  );
  if (index >= 0) {
    favorites.splice(index, 1);
    buttonElement.classList.remove("favorite");
    buttonElement.innerHTML = "&#9825;"; // coração vazio
  } else {
    favorites.push(coutry);
    buttonElement.classList.add("favorite");
    buttonElement.innerHTML = "&#10084;"; // coração cheio
  }
  localStorage.setItem("favoriteCountries", JSON.stringify(favorites));
}

regionCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", applyFilters);
});

function applyFilters() {
  const selectedRegions = Array.from(regionCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.value);

  const filteredCountries = allCountries.filter((country) => {
    //isso aqui tá muito feio Meu Deus
    if (selectedRegions.length === 0) return true;
    return selectedRegions.includes(country.region);
  });
  renderCountries(filteredCountries);
}

searchInput.addEventListener("input", (e) => {
  //console.log(e.target.value);
  //console.log(allCountries)
  const searchedCountries = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  console.log(searchedCountries);
  renderCountries(searchedCountries);
});
