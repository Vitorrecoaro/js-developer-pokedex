const headerElement = document.getElementById("header");
const statusTableElement = document.getElementById("base-stats");
const imageContainerElement = document.getElementById("image-container");

const pokeApi = new PokeApi();

function captalizeString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function createHeader(pokemonData) {
    let header = `
    <div class="text-container">
        <p class="pokemon-name">${captalizeString(pokemonData.name)}</p>
    `;

    pokemonData.types.forEach((type) => {
        header += `
            <div class="type-container">${captalizeString(type)}</div>
        `;
    });

    header += `</div>
        	#${pokemonData.number}
    `;

    headerElement.innerHTML = header;
}

function createStatus(data) {
    table = `
    <tr>
        <td class="stats-title">HP</td>
        <td class="stats-number">${data.stats[0].base_stat}</td>
        <td class="progress-bar-data">
            <div class="bar-container">
                <div style="width: ${(data.stats[0].base_stat / 250) * 100}%" class="bar-lvl"></div>
            </div>
        </td>
    </tr>
    <tr>
        <td class="stats-title">Ataque</td>
        <td class="stats-number">${data.stats[1].base_stat}</td>
        <td>
            <div class="bar-container">
                <div style="width: ${(data.stats[1].base_stat / 134) * 100}%" class="bar-lvl"></div>
            </div>
        </td>
    </tr>
    <tr>
        <td class="stats-title">Defesa</td>
        <td class="stats-number">${data.stats[2].base_stat}</td>
        <td>
            <div class="bar-container">
                <div style="width: ${(data.stats[2].base_stat / 180) * 100}%" class="bar-lvl"></div>
            </div>
        </td>
    </tr>
    <tr>
        <td class="stats-title">Ataque especial</td>
        <td class="stats-number">${data.stats[3].base_stat}</td>
        <td>
            <div class="bar-container">
                <div style="width: ${(data.stats[3].base_stat / 154) * 100}%" class="bar-lvl"></div>
            </div>
        </td>
    </tr>
    <tr>
        <td class="stats-title">Defesa especial</td>
        <td class="stats-number">${data.stats[4].base_stat}</td>
        <td>
            <div class="bar-container">
                <div style="width: ${(data.stats[4].base_stat / 154) * 100}%" class="bar-lvl"></div>
            </div>
        </td>
    </tr>
    <tr>
        <td class="stats-title">Velocidade</td>
        <td class="stats-number">${data.stats[5].base_stat}</td>
        <td>
            <div class="bar-container">
                <div style="width: ${(data.stats[5].base_stat / 140) * 100}%" class="bar-lvl"></div>
            </div>
        </td>
    </tr>
    <tr>
        <td class="stats-title">Peso</td>
        <td class="stats-number">${data.weight}</td>
        <td>
            <div class="bar-container">
                <div style="width: ${(data.weight / 50000) * 100}%" class="bar-lvl"></div>
            </div>
        </td>
    </tr>
    `;

    statusTableElement.innerHTML = table;
}

function displayImg(data) {
    imageContainerElement.innerHTML = `<img src="${data.photo}" alt="${data.name} image" />`;
}

pokeApi.getPokemon(4).then((data) => {
    createHeader(data);
    createStatus(data);
    displayImg(data);
});
