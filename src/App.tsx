import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import CharacterList from "./components/CharactersList";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/ThemeProvider";
import Login from "./components/ui/Login";
import EventsList from "./components/EventsList";

const savedEmail = localStorage.getItem("userEmail");
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return savedEmail ? children : <Navigate to="/" />;
};

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        {savedEmail && <Navbar />}
        <Routes>
          <Route
            path="/"
            element={savedEmail ? <Navigate to="/characters" /> : <Login />}
          />
          <Route
            path="/characters/:id?"
            element={
              <PrivateRoute>
                <CharacterList />
              </PrivateRoute>
            }
          />
          <Route
            path="/events/:id?"
            element={
              <PrivateRoute>
                <EventsList />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
