import "./App.css";
import { ThemeProvider } from "./components/ThemeProvider";
import CharacterSearch from "./components/CharacterSearch";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <CharacterSearch />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
