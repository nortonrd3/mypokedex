import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./App.css";

function App() {
  // For testing - can toggle this
  const isSignedIn = true;
  const userEmail = "user@example.com";

  return (
    <div className="app">
      <Header isSignedIn={isSignedIn} userEmail={userEmail} />
      <Footer />
    </div>
  );
}

export default App;
