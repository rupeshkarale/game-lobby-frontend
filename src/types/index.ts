// src/types/index.ts
export interface Game {
  id: string;
  name: string;
  entryFee: number;
  currentPlayers: number;
}

export interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  reason: string;
  timestamp: string;
}

export interface Wallet {
  userId: string;
  balance: number;
  transactions: Transaction[];
}
