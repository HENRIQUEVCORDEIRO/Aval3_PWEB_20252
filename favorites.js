const favoritesContainer = document.getElementById('favorite-country-list');
const noFavoritesMessage = document.getElementById('no-favorites-message');

function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favoriteCountries')) || [];
    favoritesContainer.innerHTML = '';

    if (favorites.length === 0) {
        noFavoritesMessage.style.display = 'block';
        return;
    } else {
        noFavoritesMessage.style.display = 'none';
    }
    favorites.forEach(country => {
        const countryCard = document.createElement('a');
        countryCard.classList.add('country-card');
        countryCard.href = `details.html?name=${country.name.common}`;

        countryCard.innerHTML = `
            <img src="${country.flags.svg}" alt="Bandeira de ${country.name.common}">
            <div class="card-content">
                <h3 class="card-title">${country.name.common}</h3>
                <p><b>População: </b>${country.population.toLocaleString("pt-BR")}</p>
                <p><b>Continente: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital?.[0] || "Indisponível"}</p>
            </div>
        `;
        favoritesContainer.appendChild(countryCard);
    });
}

loadFavorites();