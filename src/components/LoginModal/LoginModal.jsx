import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import signInIcon from "../../assets/signin.svg";

function LoginModal({ isOpen, onClose, onRegisterClick, onLogin }) {
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
    onLogin(email, password);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Sign In"
      subtitle="Welcome back! Please enter your details."
      buttonText="Sign In"
      linkText="Don't have an account? Sign up"
      onLinkClick={onRegisterClick}
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
        autoComplete="current-password"
        minLength={8}
      />
    </ModalWithForm>
  );
}

export default LoginModal;
