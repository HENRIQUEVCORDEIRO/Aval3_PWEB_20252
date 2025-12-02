const favoritesContainer = document.getElementById('favorite-country-list');
const noFavoritesMessage = document.getElementById('no-favorites-message');

export function getFavorites() {
    return JSON.parse(localStorage.getItem('favoriteCountries')) || [];
}

export function isFavorite(countryName) {
    const favorites = getFavorites();
    return favorites.some(
        (country) => country.name.common === countryName
    );
}

export function toggleFavorite(country) {
    const favorites = getFavorites();
    const index = favorites.findIndex(
        (fav) => fav.name.common === country.name.common
    );

    let isAdded = false;

    if (index >= 0) {
        favorites.splice(index, 1);
        isAdded = false;
    } else {
        favorites.push(country);
        isAdded = true;
    }
    localStorage.setItem("favoriteCountries", JSON.stringify(favorites));
    return isAdded;
}

if (favoritesContainer) {
    renderFavoritesPage();
}

function renderFavoritesPage() {
    const favorites = getFavorites();
    favoritesContainer.innerHTML = '';

    if (favorites.length === 0) {
        noFavoritesMessage.style.display = 'block';
        return; // Retorna para não tentar desenhar nada
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