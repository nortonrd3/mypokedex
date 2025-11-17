import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import "./App.css";

function App() {
  // For testing - can toggle this
  const isSignedIn = false;
  const userEmail = "user@example.com";
  const [activeModal, setActiveModal] = useState(null); // null, 'login', or 'register'

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

  return (
    <div className="app">
      <Header
        isSignedIn={isSignedIn}
        userEmail={userEmail}
        onSignInClick={handleSignInClick}
      />
      <Main />
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
