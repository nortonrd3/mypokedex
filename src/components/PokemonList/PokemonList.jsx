import "./PokemonList.css";
import PokemonCard from "../PokemonCard/PokemonCard";

function PokemonList({ pokemon, isLoading }) {
  if (isLoading) {
    return (
      <div className="pokemon-list">
        <p className="pokemon-list__loading">Loading Pokémon...</p>
      </div>
    );
  }

  if (pokemon.length === 0) {
    return (
      <div className="pokemon-list">
        <p className="pokemon-list__empty">
          No Pokémon found. Try a different search!
        </p>
      </div>
    );
  }

  return (
    <div className="pokemon-list">
      <div className="pokemon-list__grid">
        {pokemon.map((poke) => (
          <PokemonCard
            key={poke.id}
            number={poke.id.toString().padStart(3, "0")}
            name={poke.name}
            image={poke.image}
            type={poke.type}
            height={poke.height}
            weight={poke.weight}
          />
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
