import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import CharacterSearch from "./components/CharactersList";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/characters" replace />} />
          <Route path="/characters/:id?" element={<CharacterSearch />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
