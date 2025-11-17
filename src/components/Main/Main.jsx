import SearchBar from "../SearchBar/SearchBar";
import "./Main.css";

function Main() {
  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  return (
    <main className="main">
      <section className="main__section">
        <h1 className="main__title">myPokédex</h1>
        <p className="main__subtitle">Discover and collect your favorite Pokémon</p>
        <div className="main__search">
          <SearchBar size="large" onSearch={handleSearch} />
        </div>
      </section>
    </main>
  );
}

export default Main;
