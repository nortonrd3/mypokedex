import "./PokemonList.css";
import PokemonCard from "../PokemonCard/PokemonCard";
import Preloader from "../Preloader/Preloader";

function PokemonList({
  pokemon,
  isLoading,
  isSignedIn,
  collectedPokemonIds = [],
  likedPokemonIds = new Set(),
  onAddClick,
  onLikeClick,
}) {
  if (isLoading) {
    return (
      <section className="pokemon-list">
        <Preloader />
      </section>
    );
  }

  if (pokemon.length === 0) {
    return (
      <section className="pokemon-list">
        <p className="pokemon-list__empty">
          No Pokémon found. Try a different search!
        </p>
      </section>
    );
  }

  return (
    <section className="pokemon-list">
      <ul className="pokemon-list__grid">
        {pokemon.map((poke, index) => (
          <li key={`${poke.id}-${index}`} className="pokemon-list__item">
            <PokemonCard
              number={poke.id.toString().padStart(3, "0")}
              name={poke.name}
              image={poke.image}
              types={poke.types}
              height={poke.height}
              weight={poke.weight}
              isSignedIn={isSignedIn}
              isInCollection={collectedPokemonIds.includes(poke.id)}
              isLiked={
                poke.isLiked !== undefined
                  ? poke.isLiked
                  : likedPokemonIds.has(poke.id)
              }
              onAddClick={() => onAddClick(poke)}
              onLikeClick={() => onLikeClick(poke)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default PokemonList;
