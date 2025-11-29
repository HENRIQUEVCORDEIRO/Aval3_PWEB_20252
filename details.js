const countryURLName = new URLSearchParams(location.search).get("name");
const flagImg = document.querySelector(".country-details img");
const countryH1Name = document.querySelector(".country-details h1");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then((country) => {
    console.log(country.name.nativeName);
    flagImg.src = country.flags.svg;
    countryH1Name.innerText = country.name.common;
  });

//Continuar a parte do nome. Ainda testando pra ver como as requisições
//estão sendo feitas pelo console, pra garantir que vai dar tudo certo.
