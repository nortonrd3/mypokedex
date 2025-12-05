import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import Sidebar from "../Sidebar/Sidebar";
import signInIcon from "../../assets/signin.svg";
import signOutIcon from "../../assets/signout.svg";
import menuIcon from "../../assets/menu-icon.svg";

function Header({ isSignedIn = false, userEmail = "", onSignInClick }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleCollectionClick = () => {
    navigate("/collection");
  };

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <header className="header">
        <div className="header__mobile-nav">
          <h1 className="header__mobile-logo" onClick={handleHomeClick}>
            myPokédex
          </h1>
          <button
            className="header__menu-button"
            onClick={handleOpenSidebar}
            aria-label="Open menu"
          >
            <img src={menuIcon} alt="Menu" className="header__menu-icon" />
          </button>
        </div>

        <Navigation
          isSignedIn={isSignedIn}
          onHomeClick={handleHomeClick}
          onCollectionClick={handleCollectionClick}
        />
        <aside className="header__auth">
          {isSignedIn && (
            <span className="header__user-email">{userEmail}</span>
          )}
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

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
        isSignedIn={isSignedIn}
        userEmail={userEmail}
        onSignOut={onSignInClick}
      />
    </>
  );
}

export default Header;
