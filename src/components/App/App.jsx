import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import UserCollection from "../UserCollection/UserCollection";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import "./App.css";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [userEmail, setUserEmail] = useState("user@example.com");
  const [activeModal, setActiveModal] = useState(null);
  const [collectedPokemon, setCollectedPokemon] = useState([]);
  const [likedPokemonIds, setLikedPokemonIds] = useState(new Set());

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
    if (isSignedIn) {
      // Handle sign out
      setIsSignedIn(false);
      setUserEmail("");
      setCollectedPokemon([]);
      setLikedPokemonIds(new Set());
    } else {
      setActiveModal("login");
    }
  };

  const handleLogin = (email) => {
    setIsSignedIn(true);
    setUserEmail(email);
    handleCloseModal();
  };

  const handleRegister = (email) => {
    setIsSignedIn(true);
    setUserEmail(email);
    handleCloseModal();
  };

  const handleAddPokemon = (pokemon) => {
    const isAlreadyAdded = collectedPokemon.some((p) => p.id === pokemon.id);

    if (!isAlreadyAdded) {
      setCollectedPokemon([
        ...collectedPokemon,
        { ...pokemon, isLiked: likedPokemonIds.has(pokemon.id) },
      ]);
    }
  };

  const handleRemovePokemon = (pokemon) => {
    setCollectedPokemon(collectedPokemon.filter((p) => p.id !== pokemon.id));
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
    const newLikedIds = new Set(likedPokemonIds);

    if (newLikedIds.has(pokemon.id)) {
      newLikedIds.delete(pokemon.id);
    } else {
      newLikedIds.add(pokemon.id);
    }

    setLikedPokemonIds(newLikedIds);

    // Also update the collection if Pokemon is in it
    setCollectedPokemon(
      collectedPokemon.map((p) =>
        p.id === pokemon.id ? { ...p, isLiked: newLikedIds.has(pokemon.id) } : p
      )
    );
  };

  return (
    <Router>
      <div className="app">
        <Header
          isSignedIn={isSignedIn}
          userEmail={userEmail}
          onSignInClick={handleSignInClick}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Main
                isSignedIn={isSignedIn}
                collectedPokemonIds={collectedPokemon.map((p) => p.id)}
                likedPokemonIds={likedPokemonIds}
                onAddClick={handleTogglePokemon}
                onLikeClick={handleLikePokemon}
              />
            }
          />
          <Route
            path="/collection"
            element={
              <ProtectedRoute isSignedIn={isSignedIn}>
                <UserCollection
                  collectedPokemon={collectedPokemon}
                  isSignedIn={isSignedIn}
                  onRemoveClick={handleRemovePokemon}
                  onLikeClick={handleLikePokemon}
                />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />

        <LoginModal
          isOpen={activeModal === "login"}
          onClose={handleCloseModal}
          onRegisterClick={handleSwitchToRegister}
          onLogin={handleLogin}
        />
        <RegisterModal
          isOpen={activeModal === "register"}
          onClose={handleCloseModal}
          onLoginClick={handleSwitchToLogin}
          onRegister={handleRegister}
        />
      </div>
    </Router>
  );
}

export default App;
