import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import PokemonList from "../PokemonList/PokemonList";
import "./UserCollection.css";

function UserCollection({
  collectedPokemon,
  isSignedIn,
  onRemoveClick,
  onLikeClick,
}) {
  const [showOnlyLiked, setShowOnlyLiked] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter Pokemon based on like status and search query
  const filteredPokemon = collectedPokemon.filter((pokemon) => {
    const matchesLikeFilter = showOnlyLiked ? pokemon.isLiked : true;
    const matchesSearch = searchQuery
      ? pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesLikeFilter && matchesSearch;
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const toggleLikedFilter = () => {
    setShowOnlyLiked(!showOnlyLiked);
  };

  return (
    <main className="main">
      <section className="main__section">
        <h1 className="main__title">My Collection</h1>
        <p className="main__subtitle">
          {collectedPokemon.length === 0
            ? "Start building your collection!"
            : `You have ${collectedPokemon.length} Pokémon in your collection`}
        </p>
        <div className="main__search">
          <SearchBar
            size="large"
            onSearch={handleSearch}
            placeholder="Search your collection..."
          />
        </div>
      </section>

      <section className="user-collection">
        <div className="user-collection__controls">
          <button
            className={`user-collection__filter-button ${
              showOnlyLiked ? "user-collection__filter-button--active" : ""
            }`}
            onClick={toggleLikedFilter}
          >
            <span className="user-collection__filter-icon">
              {showOnlyLiked ? "❤️" : "🤍"}
            </span>
            {showOnlyLiked ? "Show All" : "Show Liked Only"}
          </button>
          <span className="user-collection__count">
            Showing {filteredPokemon.length} of {collectedPokemon.length}
          </span>
        </div>

        {collectedPokemon.length === 0 ? (
          <div className="user-collection__empty">
            <p className="user-collection__empty-text">
              Your collection is empty!
            </p>
            <p className="user-collection__empty-subtext">
              Start adding some Pokémon!
            </p>
          </div>
        ) : (
          <PokemonList
            pokemon={filteredPokemon}
            isLoading={false}
            isSignedIn={isSignedIn}
            collectedPokemonIds={collectedPokemon.map((p) => p.id)}
            onAddClick={onRemoveClick}
            onLikeClick={onLikeClick}
          />
        )}
      </section>
    </main>
  );
}

export default UserCollection;
