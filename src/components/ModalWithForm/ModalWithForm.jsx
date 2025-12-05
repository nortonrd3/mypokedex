import { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  isOpen,
  onClose,
  onSubmit,
  title,
  subtitle,
  buttonText,
  linkText,
  onLinkClick,
  children,
  icon,
  isSubmitDisabled = false,
}) {
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

  return (
    <div
      className={`modal ${isOpen ? "modal--opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__container">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        <div className="modal__icon-wrapper">
          <img src={icon} alt="" className="modal__icon" />
        </div>

        <h2 className="modal__title">{title}</h2>
        <p className="modal__subtitle">{subtitle}</p>

        <form className="modal__form" onSubmit={onSubmit}>
          {children}

          <button
            type="submit"
            className="modal__submit"
            disabled={isSubmitDisabled}
          >
            {buttonText}
          </button>
        </form>

        <button type="button" className="modal__link" onClick={onLinkClick}>
          {linkText}
        </button>
      </div>
    </div>
  );
}

export default ModalWithForm;
