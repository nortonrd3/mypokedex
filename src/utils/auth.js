// Simulate user registration
export const register = (email) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Store user data in localStorage for persistence
      const userData = {
        _id: "user-" + Date.now(),
        email: email,
        name: email.split("@")[0],
      };

      localStorage.setItem("userData", JSON.stringify(userData));

      // Simulate successful registration
      resolve({
        token: "fake-jwt-token-" + Date.now(),
        user: userData,
      });
    }, 500);
  });
};

// Simulate user login
export const authorize = (email) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate validation
      if (!email) {
        reject({ message: "Email is required" });
        return;
      }

      const userData = {
        _id: "user-" + Date.now(),
        email: email,
        name: email.split("@")[0],
      };

      localStorage.setItem("userData", JSON.stringify(userData));

      // Simulate successful login
      resolve({
        token: "fake-jwt-token-" + Date.now(),
        user: userData,
      });
    }, 500);
  });
};

// Simulate token verification
export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!token || !token.startsWith("fake-jwt-token")) {
        reject({ message: "Invalid token" });
        return;
      }

      // Retrieve user data from localStorage
      const userDataString = localStorage.getItem("userData");

      if (!userDataString) {
        reject({ message: "User data not found" });
        return;
      }

      try {
        const userData = JSON.parse(userDataString);
        resolve(userData);
      } catch {
        reject({ message: "Invalid user data" });
      }
    }, 300);
  });
};

// Simulate user logout
export const signOut = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Clear user data from localStorage
      localStorage.removeItem("userData");
      resolve({ message: "Successfully signed out" });
    }, 200);
  });
};
