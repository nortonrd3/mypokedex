import "./Navigation.css";
import homeIcon from "../../assets/home-icon.svg";
import collectionIcon from "../../assets/collection-icon.svg";

function Navigation({ isSignedIn = false, onHomeClick, onCollectionClick }) {
  return (
    <nav className="navigation">
      <h1 className="navigation__logo" onClick={onHomeClick}>
        myPokédex
      </h1>
      <button className="navigation__button" onClick={onHomeClick}>
        <img src={homeIcon} alt="Home" className="navigation__button-icon" />
        <span>Home</span>
      </button>
      {isSignedIn && (
        <button
          className="navigation__button navigation__button--collection"
          onClick={onCollectionClick}
        >
          <img
            src={collectionIcon}
            alt="My Collection"
            className="navigation__button-icon"
          />
          <span>My Collection</span>
        </button>
      )}
    </nav>
  );
}

export default Navigation;
