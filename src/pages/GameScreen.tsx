// src/pages/GameScreen.tsx
import { useParams, Link } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";

export default function GameScreen() {
  const { gameId } = useParams();

  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h5">🎮 Game Screen</Typography>
      <Typography variant="subtitle1" mt={2}>
        You have joined: <strong>{gameId}</strong>
      </Typography>
      {/* <Typography mt={2}>This is just a placeholder screen.</Typography> */}
      <Button variant="contained" component={Link} to="/" sx={{ mt: 4 }}>
        Back to Lobby
      </Button>
    </Box>
  );
}
