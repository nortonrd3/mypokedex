import "./PokemonList.css";
import PokemonCard from "../PokemonCard/PokemonCard";
import Preloader from "../Preloader/Preloader";

function PokemonList({
  pokemon,
  isLoading,
  isSignedIn,
  collectedPokemonIds = [],
  onAddClick,
  onLikeClick,
}) {
  if (isLoading) {
    return (
      <div className="pokemon-list">
        <Preloader />
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
            types={poke.types}
            height={poke.height}
            weight={poke.weight}
            isSignedIn={isSignedIn}
            isInCollection={collectedPokemonIds.includes(poke.id)}
            isLiked={poke.isLiked || false}
            onAddClick={() => onAddClick(poke)}
            onLikeClick={() => onLikeClick(poke)}
          />
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
