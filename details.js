import { isFavorite, toggleFavorite } from "./favorites.js";

const countryName = new URLSearchParams(location.search).get("name");

const flagImg = document.querySelector(".country-details img");
const countryH1Name = document.querySelector(".country-details h1");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const domain = document.querySelector(".domain");
const currencies = document.querySelector(".currencies");
const languages = document.querySelector(".languages");
const countryArea = document.querySelector(".area");
const borderCountries = document.querySelector(".border-countries");
const favoriteBtn = document.getElementById("details-favorite-btn");

function updateButtonVisual(isFav) {
  if (isFav) {
    favoriteBtn.classList.add("favorite");
    favoriteBtn.innerHTML = "&#10084; Remover dos favoritos"; // Coração Cheio
  } else {
    favoriteBtn.classList.remove("favorite");
    favoriteBtn.innerHTML = "&#9825; Adicionar aos favoritos"; // Coração Vazio
  }
}

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {

    flagImg.src = country.flags.svg;
    countryH1Name.innerText = country.name.common;
    population.innerText = country.population.toLocaleString("pt-BR");
    region.innerText = country.region;
    subRegion.innerText = country.subregion || "Indisponível";
    capital.innerText = country.capital?.[0] || "Indisponível";
    domain.innerText = country.tld ? country.tld.join(", ") : "Indisponível";
    countryArea.innerText = country.area.toLocaleString("pt-br");

    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].official;
    } else {
      nativeName.innerText = country.name.common;
    }

    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(", ");
    }

    if (country.languages) {
      languages.innerText = Object.values(country.languages).join(", ");
    }

    updateButtonVisual(isFavorite(country.name.common));

    favoriteBtn.addEventListener("click", () => {
      const isNowFavorite = toggleFavorite(country);
      updateButtonVisual(isNowFavorite);
    });

    if (country.borders) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            const borderCountryTag = document.createElement("a");
            borderCountryTag.innerText = borderCountry.name.common;
            borderCountryTag.href = `details.html?name=${borderCountry.name.common}`;
            borderCountries.append(borderCountryTag);
          });
      });
    }
  });