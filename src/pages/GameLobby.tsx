import { useEffect, useState } from "react";
import { getGames, joinGame, getWallet } from "../apis/api";
import { Game, Wallet as WalletType } from "../types";
import { Box, Snackbar, Alert, Stack, Button, Divider } from "@mui/material";
import GameCard from "../components/GameCard";
import Wallet from "../components/Wallet";
import { Link, useNavigate } from "react-router-dom";

export default function GameLobby() {
  const navigate = useNavigate();
  const [games, setGames] = useState<Game[]>([]);
  const [wallet, setWallet] = useState<WalletType | null>(null);
  const [snack, setSnack] = useState({
    message: "",
    open: false,
    error: false,
  });

  const loadData = async () => {
    const gameRes = await getGames();
    const walletRes = await getWallet();

    setGames(gameRes.data);
    setWallet(walletRes.data);
  };

  const handleJoin = async (id: string) => {
    try {
      const res = await joinGame(id);
      setSnack({ message: res.data.message, open: true, error: false });
      loadData();
      navigate(`/game/${id}`);
    } catch (err: any) {
      setSnack({
        message: err.response?.data?.error || "Failed",
        open: true,
        error: true,
      });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Box p={2}>
      {wallet && (
        <>
          <Wallet
            transactions={wallet.transactions}
            balance={wallet.balance}
            onRecharge={loadData}
          />
          <Button
            component={Link}
            to="/transactions"
            variant="outlined"
            size="small"
          >
            View Transactions →
          </Button>
        </>
      )}
      <Divider sx={{ my: 2 }} /> {/* 👈 clean separator */}
      <Stack
        direction="row"
        flexWrap="wrap"
        gap={2}
        justifyContent={{ xs: "center", sm: "flex-start" }}
        mt={4}
      >
        {games.map((game) => (
          <Box key={game.id} sx={{ flexBasis: "300px", flexGrow: 1 }}>
            <GameCard game={game} onJoin={handleJoin} />
          </Box>
        ))}
      </Stack>
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
      >
        <Alert severity={snack.error ? "error" : "success"}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
