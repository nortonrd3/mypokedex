import "./Header.css";
import homeIcon from "../../assets/home-icon.svg";
import signInIcon from "../../assets/signin.svg";
import collectionIcon from "../../assets/collection-icon.svg";
import signOutIcon from "../../assets/signout.svg";

function Header({ isSignedIn = false, userEmail = "" }) {
  return (
    <header className="header">
      <nav className="header__nav">
        <h1 className="header__logo">myPokédex</h1>
        <button className="header__button">
          <img src={homeIcon} alt="Home" className="header__button-icon" />
          <span>Home</span>
        </button>
        {isSignedIn && (
          <button className="header__button header__button--collection">
            <img
              src={collectionIcon}
              alt="My Collection"
              className="header__button-icon"
            />
            <span>My Collection</span>
          </button>
        )}
      </nav>
      <aside className="header__auth">
        {isSignedIn && <span className="header__user-email">{userEmail}</span>}
        <button className="header__button">
          <img
            src={isSignedIn ? signOutIcon : signInIcon}
            alt={isSignedIn ? "Sign Out" : "Sign In"}
            className="header__button-icon"
          />
          <span>{isSignedIn ? "Sign Out" : "Sign In"}</span>
        </button>
      </aside>
    </header>
  );
}

export default Header;
