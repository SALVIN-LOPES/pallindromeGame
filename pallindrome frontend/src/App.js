import { Container } from "react-bootstrap";

import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import GameScreen from "./screens/GameScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="" element={<HomeScreen />} />
            <Route path="/start/" element={<GameScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
          </Routes>
        </Container>
      </main>
    </Router>
  );
}

export default App;
