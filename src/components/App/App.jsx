import Header from "../Header/Header";
import "./App.css";

function App() {
  // For testing - can toggle this
  const isSignedIn = false;
  const userEmail = "user@example.com";

  return (
    <div className="app">
      <Header isSignedIn={isSignedIn} userEmail={userEmail} />
    </div>
  );
}

export default App;
