import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import closeIcon from "../../assets/close-icon.svg";
import homeIcon from "../../assets/home-icon.svg";
import collectionIcon from "../../assets/collection-icon.svg";
import signOutIcon from "../../assets/signout.svg";

function Sidebar({ isOpen, onClose, isSignedIn, userEmail, onSignOut }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleHomeClick = () => {
    navigate("/");
    onClose();
  };

  const handleCollectionClick = () => {
    navigate("/collection");
    onClose();
  };

  const handleSignOut = () => {
    onSignOut();
    onClose();
  };

  return (
    <div
      className={`sidebar ${isOpen ? "sidebar--opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="sidebar__container">
        <button
          type="button"
          className="sidebar__close"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <img src={closeIcon} alt="Close" className="sidebar__close-icon" />
        </button>

        {isSignedIn && (
          <div className="sidebar__user">
            <span className="sidebar__user-email">{userEmail}</span>
          </div>
        )}

        <nav className="sidebar__nav">
          <button className="sidebar__nav-button" onClick={handleHomeClick}>
            <img
              src={homeIcon}
              alt="Home"
              className="sidebar__nav-button-icon"
            />
            <span>Home</span>
          </button>

          {isSignedIn && (
            <>
              <button
                className="sidebar__nav-button"
                onClick={handleCollectionClick}
              >
                <img
                  src={collectionIcon}
                  alt="My Collection"
                  className="sidebar__nav-button-icon"
                />
                <span>My Collection</span>
              </button>

              <button
                className="sidebar__nav-button sidebar__nav-button--signout"
                onClick={handleSignOut}
              >
                <img
                  src={signOutIcon}
                  alt="Sign Out"
                  className="sidebar__nav-button-icon"
                />
                <span>Sign Out</span>
              </button>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
