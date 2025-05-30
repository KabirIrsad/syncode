import { io } from "socket.io-client";

export const initSocket = async () => {

  const options = {
    transports: ["websocket"],
    jsonp: false,
    forceNew: true,
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    randomizationFactor: 0.5,
  };

    return io(`${import.meta.env.VITE_BACKEND_URL}`, options);
  };