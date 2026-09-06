import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.VITE_API_URL ||
  "https://women-safety-ai-system.onrender.com";

const socket = io(SOCKET_URL);

export default socket;