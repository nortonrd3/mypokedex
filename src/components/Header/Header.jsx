import "./Header.css";
import Navigation from "../Navigation/Navigation";
import signInIcon from "../../assets/signin.svg";
import signOutIcon from "../../assets/signout.svg";

function Header({
  isSignedIn = false,
  userEmail = "",
  onSignInClick,
  onHomeClick,
  onCollectionClick,
}) {
  return (
    <header className="header">
      <Navigation
        isSignedIn={isSignedIn}
        onHomeClick={onHomeClick}
        onCollectionClick={onCollectionClick}
      />
      <aside className="header__auth">
        {isSignedIn && <span className="header__user-email">{userEmail}</span>}
        <button className="header__button" onClick={onSignInClick}>
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
