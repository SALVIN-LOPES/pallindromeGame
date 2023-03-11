import { Container } from "react-bootstrap";

import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import GameScreen from "./screens/GameScreen";
import ProfileScreen from "./screens/ProfileScreen";
import UserGamesListScreen from "./screens/UserGamesListScreen";
import AdminListUsers from "./screens/AdminListUsers";
import UserEditScreen from "./screens/UserEditScreen";

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
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/userGames" element={<UserGamesListScreen />} />
            <Route path="/admin/userlist" element={<AdminListUsers />} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
          </Routes>
        </Container>
      </main>
    </Router>
  );
}

export default App;
