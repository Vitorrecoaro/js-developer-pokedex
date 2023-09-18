class PokeApi {
    async getPokemonDetail(pokemonDetail) {
        const response = await fetch(pokemonDetail.url);
        const pokeDetail = await response.json();

        return this.convertPokeApiDetailToPokemon(pokeDetail);
    }

    convertPokeApiDetailToPokemon(pokeDetail) {
        const pokemon = new Pokemon();
        pokemon.number = pokeDetail.id;
        pokemon.name = pokeDetail.name;
        pokemon.stats = pokeDetail.stats;
        pokemon.weight = pokeDetail.weight;

        const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
        const [type] = types;

        pokemon.types = types;
        pokemon.type = type;

        pokemon.photo = pokeDetail.sprites.other.home.front_default;

        return pokemon;
    }

    async getPokemons(offset = 0, limit = 5) {
        const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

        const response = await fetch(url);
        const jsonBody = await response.json();
        const pokemons = jsonBody.results;
        const detailRequests = pokemons.map(this.getPokemonDetail.bind(this));
        const pokemonsDetails = await Promise.all(detailRequests);
        return pokemonsDetails;
    }

    async getPokemon(id) {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

        const response = await (await fetch(url)).json();
        return this.convertPokeApiDetailToPokemon(response);
    }
}
