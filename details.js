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
const borderCountries = document.querySelector(".border-countries");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    //console.log(Object.values(country.name.nativeName)[0].common);
    console.log(country.borders);
    flagImg.src = country.flags.svg;
    countryH1Name.innerText = country.name.common;
    population.innerText = country.population.toLocaleString("pt-BR");
    region.innerText = country.region;
    subRegion.innerText = country.subregion;
    capital.innerText = country.capital?.[0];
    domain.innerText = country.tld.join(", ");

    if (country.capital) {
      capital.innerText = country.capital?.[0];
    }

    if (country.subregion) {
      subRegion.innerText = country.subregion;
    }

    console.log(country);
    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    } else {
      nativeName.innerText = country.name.common;
    }

    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(", ");
    }

    //if (country.capital) {
    //  console.log(country.capital.join(", "));
    //}

    if (country.languages) {
      languages.innerText = Object.values(country.languages).join(", ");
    }

    console.log(country);

    if (country.borders) {
      country.borders.forEach((border) => {
        //console.log(border);
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            //console.log(borderCountry);
            const borderCountryTag = document.createElement("a");
            borderCountryTag.innerText = borderCountry.name.common;
            borderCountryTag.href = `details.html?name=${borderCountry.name.common}`;
            //console.log(borderCountryTag);
            borderCountries.append(borderCountryTag);
          });
      });
    }
  });
