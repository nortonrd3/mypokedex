import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import UserCollection from "../UserCollection/UserCollection";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Preloader from "../Preloader/Preloader";
import { authorize, register, checkToken, signOut } from "../../utils/auth";
import {
  getCollection,
  addToCollection,
  removeFromCollection,
  toggleLike,
  clearCollection,
} from "../../utils/collectionApi";
import "./App.css";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [activeModal, setActiveModal] = useState(null);
  const [collectedPokemon, setCollectedPokemon] = useState([]);
  const [likedPokemonIds, setLikedPokemonIds] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      checkToken(token)
        .then((user) => {
          setIsSignedIn(true);
          setUserEmail(user.email);

          // Load user's collection
          return getCollection();
        })
        .then((data) => {
          setCollectedPokemon(data.collection);
          setLikedPokemonIds(new Set(data.likedIds));
        })
        .catch((err) => {
          console.error("Token validation failed:", err);
          localStorage.removeItem("token");
          localStorage.removeItem("userData");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

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
      signOut()
        .then(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userData");
          setIsSignedIn(false);
          setUserEmail("");

          // Clear collection from backend
          return clearCollection();
        })
        .then(() => {
          setCollectedPokemon([]);
          setLikedPokemonIds(new Set());
        })
        .catch((err) => {
          console.error("Sign out error:", err);
        });
    } else {
      setActiveModal("login");
    }
  };

  const handleLogin = (email, password) => {
    authorize(email, password)
      .then((response) => {
        localStorage.setItem("token", response.token);
        setIsSignedIn(true);
        setUserEmail(response.user.email);
        handleCloseModal();

        // Load user's collection
        return getCollection();
      })
      .then((data) => {
        setCollectedPokemon(data.collection);
        setLikedPokemonIds(new Set(data.likedIds));
      })
      .catch((err) => {
        console.error("Login error:", err);
        alert(err.message || "Login failed");
      });
  };

  const handleRegister = (email, password) => {
    register(email, password)
      .then((response) => {
        localStorage.setItem("token", response.token);
        setIsSignedIn(true);
        setUserEmail(response.user.email);
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Registration error:", err);
        alert(err.message || "Registration failed");
      });
  };

  const handleAddPokemon = (pokemon) => {
    addToCollection(pokemon)
      .then((savedPokemon) => {
        setCollectedPokemon([...collectedPokemon, savedPokemon]);
        console.log("Pokemon added to collection:", savedPokemon);
      })
      .catch((err) => {
        console.error("Error adding Pokemon:", err);
      });
  };

  const handleRemovePokemon = (pokemon) => {
    removeFromCollection(pokemon.id)
      .then((response) => {
        setCollectedPokemon(
          collectedPokemon.filter((p) => p.id !== pokemon.id)
        );
        console.log("Pokemon removed:", response);
      })
      .catch((err) => {
        console.error("Error removing Pokemon:", err);
      });
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
    toggleLike(pokemon.id)
      .then((response) => {
        setLikedPokemonIds(new Set(response.likedIds));

        // Update collection if Pokemon is in it
        setCollectedPokemon(
          collectedPokemon.map((p) =>
            p.id === pokemon.id ? { ...p, isLiked: response.isLiked } : p
          )
        );

        console.log("Like toggled:", response);
      })
      .catch((err) => {
        console.error("Error toggling like:", err);
      });
  };

  if (isLoading) {
    return (
      <div className="app app--loading">
        <Preloader />
      </div>
    );
  }

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
