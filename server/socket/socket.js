import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const userSocketMap = {};
const roomData = {};

const getAllClients = (room) => {
  return Array.from(io.sockets.adapter.rooms.get(room) || []).map((socketId) => {
    return {
      socketId,
      username: userSocketMap[socketId],
    };
  });
};

function generateTimeStamp() {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const amOrPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
}

io.on("connection", (socket) => {
  socket.on("join", ({ roomId, username }) => {
    if (!roomData[roomId]) {
      roomData[roomId] = {
        code: "//Write your code here",
        canvasData: [],
        messages: [],
        selectedLanguage: "",
      };
    }

    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllClients(roomId);

    clients.forEach(({ socketId }) => {
      io.to(socketId).emit("joined", {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  socket.on("sync-changes", ({ roomId, socketId }) => {
    io.to(socketId).emit("sync-changes", { roomData: roomData[roomId] });
  });

  socket.on("code-change", ({ roomId, code }) => {
    roomData[roomId] = { ...roomData[roomId], code };
    socket.in(roomId).emit("code-change", { code });
  });

  socket.on("message", ({ roomId, message }) => {
    const msgObj = {
      message,
      id: Date.now(),
      username: userSocketMap[socket.id],
      timestamp: generateTimeStamp(),
    };

    if (roomData[roomId]) {
      roomData[roomId].messages.push(msgObj);
    }

    io.in(roomId).emit("message", msgObj);
  });

  socket.on("canvas-change", ({ roomId, type, username, newChanges }) => {
    if (roomData[roomId]) {
      roomData[roomId].canvasData.push(...newChanges);
    }

    socket.in(roomId).emit("canvas-change", {
      type,
      username,
      newChanges,
      canvasData: roomData[roomId].canvasData,
    });
  });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      if (roomId !== socket.id) {
        socket.to(roomId).emit("disconnected", {
          socketId: socket.id,
          username: userSocketMap[socket.id],
        });

        // Delay the cleanup to ensure disconnect completes
        setTimeout(() => {
          const room = io.sockets.adapter.rooms.get(roomId);
          if (!room || room.size === 0) {
            delete roomData[roomId];
            console.log(`Room "${roomId}" has been cleared from memory.`);
          }
        }, 1000);
      }
    });

    delete userSocketMap[socket.id];

    socket.leave();
  });
});

export { app, server, io };
