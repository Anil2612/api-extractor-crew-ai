import { useState } from "react";
import Login from "./pages/Login/Login";
import Landing from "./pages/Landing/Landing";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return isLoggedIn ? (
    <Landing onLogout={() => setIsLoggedIn(false)} />
  ) : (
    <Landing onLogout={() => setIsLoggedIn(false)} />
    // <Login onLogin={() => setIsLoggedIn(true)} />
  );
}

export default App;
