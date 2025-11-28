import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import "./App.css";

function App() {
  // For testing - can toggle this
  const isSignedIn = true; // Changed to true to see the buttons
  const userEmail = "user@example.com";
  const [activeModal, setActiveModal] = useState(null);

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
    console.log("Adding pokemon to collection:", pokemon);
    // Will implement collection logic later
  };

  const handleLikePokemon = (pokemon) => {
    console.log("Toggling like for pokemon:", pokemon);
    // Will implement like logic later
  };

  return (
    <div className="app">
      <Header
        isSignedIn={isSignedIn}
        userEmail={userEmail}
        onSignInClick={handleSignInClick}
      />
      <Main
        isSignedIn={isSignedIn}
        onAddClick={handleAddPokemon}
        onLikeClick={handleLikePokemon}
      />
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
