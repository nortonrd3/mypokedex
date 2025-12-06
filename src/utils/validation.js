export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return "Email is required";
  }
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  return "";
};

export const validateLoginPassword = (password) => {
  if (!password) {
    return "Password is required";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }
  return "";
};

export const validateRegisterPassword = (password) => {
  if (!password) {
    return "Password is required";
  }
  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }
  if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
    return "Password must contain both uppercase and lowercase letters";
  }
  if (!/(?=.*\d)/.test(password)) {
    return "Password must contain at least one number";
  }
  return "";
};

export const validateConfirmPassword = (confirmPassword, password) => {
  if (!confirmPassword) {
    return "Please confirm your password";
  }
  if (confirmPassword !== password) {
    return "Passwords do not match";
  }
  return "";
};

export const isFieldValid = (value) => {
  return value && value.trim().length > 0;
};

export const hasErrors = (errors) => {
  return Object.values(errors).some((error) => error !== "");
};

export const areFieldsFilled = (...fields) => {
  return fields.every((field) => field && field.trim().length > 0);
};
