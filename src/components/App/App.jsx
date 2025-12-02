import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import UserCollection from "../UserCollection/UserCollection";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import "./App.css";

function App() {
  const isSignedIn = true;
  const userEmail = "user@example.com";
  const [activeModal, setActiveModal] = useState(null);
  const [currentView, setCurrentView] = useState("home");
  const [collectedPokemon, setCollectedPokemon] = useState([]);

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleSwitchToRegister = () => {
    setActiveModal("register");
  };

  const handleSwitchToLogin = () => {
    setActiveModal("login");
  };

  const handleSignInClick = () => {
    setActiveModal("login");
  };

  const handleAddPokemon = (pokemon) => {
    const isAlreadyAdded = collectedPokemon.some((p) => p.id === pokemon.id);

    if (!isAlreadyAdded) {
      setCollectedPokemon([
        ...collectedPokemon,
        { ...pokemon, isLiked: false },
      ]);
      console.log("Adding pokemon to collection:", pokemon);
    } else {
      console.log("Pokemon already in collection");
    }
  };

  const handleRemovePokemon = (pokemon) => {
    setCollectedPokemon(collectedPokemon.filter((p) => p.id !== pokemon.id));
    console.log("Removing pokemon from collection:", pokemon);
  };

  const handleTogglePokemon = (pokemon) => {
    const isInCollection = collectedPokemon.some((p) => p.id === pokemon.id);

    if (isInCollection) {
      handleRemovePokemon(pokemon);
    } else {
      handleAddPokemon(pokemon);
    }
  };

  const handleLikePokemon = (pokemon) => {
    setCollectedPokemon(
      collectedPokemon.map((p) =>
        p.id === pokemon.id ? { ...p, isLiked: !p.isLiked } : p
      )
    );
    console.log("Toggling like for pokemon:", pokemon);
  };

  const handleNavigateToHome = () => {
    setCurrentView("home");
  };

  const handleNavigateToCollection = () => {
    setCurrentView("collection");
  };

  return (
    <div className="app">
      <Header
        isSignedIn={isSignedIn}
        userEmail={userEmail}
        onSignInClick={handleSignInClick}
        onHomeClick={handleNavigateToHome}
        onCollectionClick={handleNavigateToCollection}
      />

      {currentView === "home" ? (
        <Main
          isSignedIn={isSignedIn}
          collectedPokemonIds={collectedPokemon.map((p) => p.id)}
          onAddClick={handleTogglePokemon}
          onLikeClick={handleLikePokemon}
        />
      ) : (
        <UserCollection
          collectedPokemon={collectedPokemon}
          isSignedIn={isSignedIn}
          onRemoveClick={handleRemovePokemon}
          onLikeClick={handleLikePokemon}
        />
      )}

      <Footer />
      <LoginModal
        isOpen={activeModal === "login"}
        onClose={handleCloseModal}
        onRegisterClick={handleSwitchToRegister}
      />
      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={handleCloseModal}
        onLoginClick={handleSwitchToLogin}
      />
    </div>
  );
}

export default App;
