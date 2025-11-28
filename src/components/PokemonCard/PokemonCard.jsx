import "./PokemonCard.css";
import heartInactive from "../../assets/like-inactive.svg";
import heartActive from "../../assets/like-active.svg";

function PokemonCard({
  number,
  name,
  image,
  type,
  height,
  weight,
  isSignedIn = false,
  isLiked = false,
  onAddClick,
  onLikeClick,
}) {
  // Type color mapping
  const typeColors = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
  };

  const typeColor = typeColors[type?.toLowerCase()] || "#777";

  return (
    <div className="pokemon-card">
      <span className="pokemon-card__number">#{number}</span>

      <div className="pokemon-card__image-wrapper">
        <img src={image} alt={name} className="pokemon-card__image" />
      </div>

      <div className="pokemon-card__stats">
        <h3 className="pokemon-card__name">{name}</h3>

        <span
          className="pokemon-card__type"
          style={{ backgroundColor: typeColor }}
        >
          {type}
        </span>

        <div className="pokemon-card__measurements">
          <div className="pokemon-card__measurement">
            <span className="pokemon-card__label">Height</span>
            <span className="pokemon-card__value">{height} m</span>
          </div>
          <div className="pokemon-card__measurement">
            <span className="pokemon-card__label">Weight</span>
            <span className="pokemon-card__value">{weight} kg</span>
          </div>
        </div>

        {isSignedIn && (
          <div className="pokemon-card__actions">
            <button
              className="pokemon-card__add-button"
              onClick={onAddClick}
              aria-label={`Add ${name} to collection`}
            >
              + Add
            </button>
            <button
              className="pokemon-card__like-button"
              onClick={onLikeClick}
              aria-label={`${isLiked ? "Unlike" : "Like"} ${name}`}
            >
              <img
                src={isLiked ? heartActive : heartInactive}
                alt={isLiked ? "Liked" : "Not liked"}
                className="pokemon-card__like-icon"
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PokemonCard;
