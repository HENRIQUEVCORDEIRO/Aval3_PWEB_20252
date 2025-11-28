const countriesContainer = document.querySelector(".countries-container");

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((country) => {
      console.log(country);
      const countryCard = document.createElement("a");
      countryCard.classList.add("countryCard");
      countryCard.innerHTML = `
            <img src="https://flagcdn.com/de.svg" alt="flag">
            <div class="card-content">
                <h3 class="card-title">Alemanha</h3>
                <p><b>Populacao:</b>83,491,249</p>
                <p><b>Continente:</b>Europa</p>
                <p><b>Capital:</b>Berlim</p>
            </div>
        `;

      countriesContainer.append(countryCard);
    });
  });
