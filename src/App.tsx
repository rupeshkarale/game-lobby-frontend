// src/App.tsx
import { Container, Typography } from "@mui/material";
import GameLobby from "./pages/GameLobby";
import { Route, Routes } from "react-router-dom";
import GameScreen from "./pages/GameScreen";
import TransactionPage from "./pages/TransactionPage";

function App() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        align="center"
        variant="h4"
        sx={{
          fontWeight: 700,
          letterSpacing: 1,
          textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
          color: "primary.main",
        }}
      >
        Winzo
      </Typography>

      <Routes>
        <Route path="/" element={<GameLobby />} />
        <Route path="/game/:gameId" element={<GameScreen />} />
        <Route path="/transactions" element={<TransactionPage />} />
      </Routes>
    </Container>
  );
}

export default App;
