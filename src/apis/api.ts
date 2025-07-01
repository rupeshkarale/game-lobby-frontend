// src/api.ts
import axios from "axios";

const BASE_URL = "http://localhost:3001/api";

export const getGames = () => axios.get(`${BASE_URL}/games`);
export const joinGame = (gameId: string) =>
  axios.post(`${BASE_URL}/games/join`, { gameId });

export const getWallet = () => axios.get(`${BASE_URL}/wallet`);
export const rechargeWallet = (amount: number) =>
  axios.post(`${BASE_URL}/wallet/recharge`, { amount });
