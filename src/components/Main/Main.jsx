import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import PokemonList from "../PokemonList/PokemonList";
import { getRandomPokemon, searchPokemon } from "../../utils/PokeApi";
import "./Main.css";

function Main() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [displayedPokemon, setDisplayedPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch 20 random Pokemon on mount
  useEffect(() => {
    setIsLoading(true);

    getRandomPokemon(20)
      .then((pokemonData) => {
        setAllPokemon(pokemonData);
        setDisplayedPokemon(pokemonData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Pokemon:", error);
        setIsLoading(false);
      });
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      setDisplayedPokemon(allPokemon);
      return;
    }

    setIsLoading(true);

    searchPokemon(query)
      .then((pokemon) => {
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
