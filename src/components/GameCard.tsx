// src/components/GameCard.tsx
import { Card, CardContent, Typography, Button } from "@mui/material";
import { Game } from "../types";

interface Props {
  game: Game;
  onJoin: (id: string) => void;
}

export default function GameCard({ game, onJoin }: Props) {
  return (
    <Card sx={{ minWidth: 250 }}>
      <CardContent>
        <Typography variant="h6">{game.name}</Typography>
        <Typography variant="body2">
          🎮 Players: {game.currentPlayers}
        </Typography>
        <Typography variant="body2">💰 Entry: {game.entryFee} Coins</Typography>
        <Button
          variant="contained"
          onClick={() => onJoin(game.id)}
          sx={{ mt: 2 }}
        >
          Join
        </Button>
      </CardContent>
    </Card>
  );
}
