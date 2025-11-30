const countriesContainer = document.querySelector(".container-countries");

fetch(
  "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital"
)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data);

    data.forEach((country) => {
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
                <p><b>Capital: </b>${country.capital?.[0] || "Unavailable"}</p>
            </div>
        `;

      countriesContainer.append(countryCard);
    });
  });
