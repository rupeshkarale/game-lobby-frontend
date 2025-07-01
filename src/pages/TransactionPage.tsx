import { useEffect, useState } from "react";
import { getWallet } from "../apis/api";
import { Transaction } from "../types";
import {
  Box,
  Typography,
  Stack,
  CircularProgress,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function TransactionPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTransactions = async () => {
    setLoading(true);
    const res = await getWallet();
    setTransactions(res.data.transactions);
    setLoading(false);
  };

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    const options: Intl.DateTimeFormatOptions = {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  return (
    <Box p={2}>
      <Box
        p={0}
        m={0}
        display="flex"
        gap={2} // justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Button
          variant="outlined"
          component={Link}
          to="/"
          size="small"
          sx={{
            minWidth: "32px",
            padding: 0,
            mb: 1,

            // color: "black",
          }}
        >
          <ArrowBackIcon fontSize="small" />
        </Button>

        <Typography variant="h5" gutterBottom>
          Transaction History
        </Typography>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : transactions.length === 0 ? (
        <Typography variant="body2">No transactions found.</Typography>
      ) : (
        <Stack spacing={1}>
          {transactions.map((txn) => (
            <Box
              key={txn.id}
              sx={{
                fontSize: 14,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #eee",
                py: 1,
              }}
            >
              <Box sx={{ width: "50%", textTransform: "capitalize" }}>
                {txn.reason}{" "}
              </Box>
              <Box
                sx={{
                  width: "30%",
                  textAlign: "center",
                  color: "#666",
                  fontSize: 10, // 👈 smaller font
                }}
              >
                {formatDate(txn.timestamp)}
              </Box>

              <Box
                sx={{
                  width: "20%",
                  textAlign: "right",
                  color: txn.type === "credit" ? "green" : "red",
                  fontWeight: 500,
                }}
              >
                {txn.type === "credit" ? "+" : "-"}
                {txn.amount}
              </Box>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
}
