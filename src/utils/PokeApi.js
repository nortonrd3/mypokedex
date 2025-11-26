const BASE_URL = "https://pokeapi.co/api/v2";

// Process Pokemon data into a consistent format
function processPokemonData(data) {
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other["official-artwork"].front_default,
    type: data.types[0].type.name,
    height: (data.height / 10).toFixed(1), // Convert to meters
    weight: (data.weight / 10).toFixed(1), // Convert to kg
  };
}

// Check response and parse JSON
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

// Fetch a single Pokemon by ID or name
export function getPokemon(identifier) {
  return fetch(`${BASE_URL}/pokemon/${identifier}`)
    .then(checkResponse)
    .then(processPokemonData);
}

// Fetch multiple random Pokemon
export function getRandomPokemon(count = 20) {
  const randomIds = Array.from(
    { length: count },
    () => Math.floor(Math.random() * 898) + 1
  );

  const promises = randomIds.map((id) =>
    fetch(`${BASE_URL}/pokemon/${id}`).then(checkResponse)
  );

  return Promise.all(promises).then((results) =>
    results.map(processPokemonData)
  );
}

// Search Pokemon by name
export function searchPokemon(query) {
  return fetch(`${BASE_URL}/pokemon/${query.toLowerCase()}`)
    .then(checkResponse)
    .then(processPokemonData);
}
