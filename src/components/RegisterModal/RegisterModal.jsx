import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import signInIcon from "../../assets/signin.svg";
import {
  validateEmail,
  validateRegisterPassword,
  validateConfirmPassword,
} from "../../utils/validation";

function RegisterModal({ isOpen, onClose, onLoginClick, onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
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
        password: validateRegisterPassword(value),
      }));
    }
    // Re-validate confirm password if it's been touched
    if (touched.confirmPassword && confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateConfirmPassword(confirmPassword, value),
      }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (touched.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateConfirmPassword(value, password),
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
        password: validateRegisterPassword(password),
      }));
    } else if (field === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: validateConfirmPassword(confirmPassword, password),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const emailError = validateEmail(email);
    const passwordError = validateRegisterPassword(password);
    const confirmPasswordError = validateConfirmPassword(
      confirmPassword,
      password
    );

    setErrors({
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
    });

    setTouched({
      email: true,
      password: true,
      confirmPassword: true,
    });

    // Only submit if no errors
    if (!emailError && !passwordError && !confirmPasswordError) {
      onRegister(email, password);
    }
  };

  const isFormValid =
    !errors.email &&
    !errors.password &&
    !errors.confirmPassword &&
    email &&
    password &&
    confirmPassword;

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
      iconAlt="Create account"
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
          autoComplete="new-password"
        />
        {touched.password && errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </div>

      <div className="modal__input-wrapper">
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          onBlur={() => handleBlur("confirmPassword")}
          className={`modal__input ${
            touched.confirmPassword && errors.confirmPassword
              ? "modal__input--error"
              : ""
          }`}
          autoComplete="new-password"
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <span className="modal__error">{errors.confirmPassword}</span>
        )}
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
