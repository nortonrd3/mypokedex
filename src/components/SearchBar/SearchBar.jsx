import { useState } from "react";
import "./SearchBar.css";
import searchIcon from "../../assets/search-icon.svg";

function SearchBar({
  size = "large",
  placeholder = "Search Pokémon by name...",
  onSearch,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
    console.log("Searching for:", searchQuery);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`search-bar search-bar--${size}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        className="search-bar__input"
      />
      <button
        onClick={handleSearch}
        className="search-bar__button"
        aria-label="Search"
      >
        <img src={searchIcon} alt="search icon" className="search-bar__icon" />
      </button>
    </div>
  );
}

export default SearchBar;
