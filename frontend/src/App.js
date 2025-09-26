import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Game from "./pages/Game";
import Results from "./pages/Results";

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />

        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/game" element={<Game />} />
        <Route path="/results" element={<Results />} />

      </Routes>
    </Router>
  );
}

export default App;
