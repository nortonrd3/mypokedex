import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import signInIcon from "../../assets/signin.svg";
import { validateEmail, validateLoginPassword } from "../../utils/validation";

function LoginModal({ isOpen, onClose, onRegisterClick, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setErrors({});
      setTouched({});
    }
  }, [isOpen]);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (touched.email) {
      setErrors((prev) => ({
        ...prev,
        email: validateEmail(value),
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (touched.password) {
      setErrors((prev) => ({
        ...prev,
        password: validateLoginPassword(value),
      }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(email) }));
    } else if (field === "password") {
      setErrors((prev) => ({
        ...prev,
        password: validateLoginPassword(password),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const emailError = validateEmail(email);
    const passwordError = validateLoginPassword(password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    setTouched({
      email: true,
      password: true,
    });

    // Only submit if no errors
    if (!emailError && !passwordError) {
      onLogin(email, password);
    }
  };

  const isFormValid = !errors.email && !errors.password && email && password;

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
      iconAlt="Sign in"
      isSubmitDisabled={!isFormValid}
    >
      <div className="modal__input-wrapper">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          onBlur={() => handleBlur("email")}
          className={`modal__input ${
            touched.email && errors.email ? "modal__input--error" : ""
          }`}
          autoComplete="email"
        />
        {touched.email && errors.email && (
          <span className="modal__error">{errors.email}</span>
        )}
      </div>

      <div className="modal__input-wrapper">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          onBlur={() => handleBlur("password")}
          className={`modal__input ${
            touched.password && errors.password ? "modal__input--error" : ""
          }`}
          autoComplete="current-password"
        />
        {touched.password && errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
