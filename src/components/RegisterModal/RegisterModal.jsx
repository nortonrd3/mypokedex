import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import signInIcon from "../../assets/signin.svg";

function RegisterModal({ isOpen, onClose, onLoginClick, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onRegister handler passed from App
    onRegister(email, password);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Create Account"
      subtitle="Join us! Enter your details to get started."
      buttonText="Create Account"
      linkText="Already have an account? Sign in"
      onLinkClick={onLoginClick}
      icon={signInIcon}
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="modal__input"
        required
        autoComplete="email"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="modal__input"
        required
        autoComplete="new-password"
        minLength={8}
      />
    </ModalWithForm>
  );
}

export default RegisterModal;
