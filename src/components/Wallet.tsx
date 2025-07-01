// src/components/Wallet.tsx
import { Button, Typography, Stack, Divider, Box } from "@mui/material";
import { rechargeWallet } from "../apis/api";
import { Transaction } from "../types";

interface Props {
  balance: number;
  transactions: Transaction[];
  onRecharge: () => void;
}

export default function Wallet({ balance, transactions, onRecharge }: Props) {
  const handleRecharge = async (amount: number) => {
    await rechargeWallet(amount);
    onRecharge();
  };

  return (
    <Stack my={2} spacing={2}>
      <Typography variant="h6">💰 Balance: {balance} Coins</Typography>
      <Stack direction="row" spacing={1}>
        {[10, 50, 100].map((amt) => (
          <Button
            key={amt}
            variant="contained"
            onClick={() => handleRecharge(amt)}
          >
            +{amt}
          </Button>
        ))}
      </Stack>

      {/* <Typography variant="subtitle1">🧾 Transaction History</Typography> */}
      {/* <Stack spacing={1}>
        {transactions.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            No transactions yet.
          </Typography>
        )}
        {transactions.map((txn) => (
          <Box
            key={txn.id}
            sx={{
              fontSize: 14,
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #eee",
              pb: 0.5,
            }}
          >
            <span>
              {txn.reason} - {txn.type === "credit" ? "+" : "-"}
              {txn.amount}
            </span>
            <span style={{ color: "#888", fontSize: 12 }}>
              {new Date(txn.timestamp).toLocaleString()}
            </span>
          </Box>
        ))}
      </Stack> */}
    </Stack>
  );
}
