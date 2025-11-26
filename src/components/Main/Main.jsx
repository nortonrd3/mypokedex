import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import PokemonList from "../PokemonList/PokemonList";
import "./Main.css";

function Main() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch 20 random Pokemon on mount
  useEffect(() => {
    const fetchRandomPokemon = () => {
      setIsLoading(true);

      const randomIds = Array.from(
        { length: 20 },
        () => Math.floor(Math.random() * 898) + 1
      );

      const promises = randomIds.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
          res.json()
        )
      );

      Promise.all(promises)
        .then((results) => {
          const pokemonData = results.map((data) => ({
            id: data.id,
            name: data.name,
            image: data.sprites.other["official-artwork"].front_default,
            type: data.types[0].type.name,
            height: (data.height / 10).toFixed(1), // Convert to meters
            weight: (data.weight / 10).toFixed(1), // Convert to kg
          }));

          setAllPokemon(pokemonData);
          setDisplayedPokemon(pokemonData);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching Pokemon:", error);
          setIsLoading(false);
        });
    };

    fetchRandomPokemon();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setDisplayedPokemon(allPokemon);
      return;
    }

    setIsLoading(true);

    fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Pokemon not found");
        }
      })
      .then((data) => {
        const pokemon = {
          id: data.id,
          name: data.name,
          image: data.sprites.other["official-artwork"].front_default,
          type: data.types[0].type.name,
          height: (data.height / 10).toFixed(1),
          weight: (data.weight / 10).toFixed(1),
        };
        setDisplayedPokemon([pokemon]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error searching Pokemon:", error);
        setDisplayedPokemon([]);
        setIsLoading(false);
      });
  };

  return (
    <main className="main">
      <section className="main__section">
        <h1 className="main__title">myPokédex</h1>
        <p className="main__subtitle">
          Discover and collect your favorite Pokémon
        </p>
        <div className="main__search">
          <SearchBar size="large" onSearch={handleSearch} />
        </div>
      </section>
      <PokemonList pokemon={displayedPokemon} isLoading={isLoading} />
    </main>
  );
}

export default Main;
