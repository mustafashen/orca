import express from "express";
import { join } from "path";
import { WebSocket, WebSocketServer } from "ws";
import mainRoutes from "./routes";
import socketHandler from "./ws";

function initHTTPServer(port: number = 3000) {
  const app = express();
  app.use(express.static(join(process.cwd(), "dist", "public")));
  app.use(mainRoutes);
  app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
  });

  return app;
}

function initWSServer(port: number = 3001) {
  const wss = new WebSocketServer({ port });

  wss.on("connection", (ws) => {
    console.log("Client connected");

    const ais = new WebSocket('wss://stream.aisstream.io/v0/stream')
    
    ais.on('open', () => {
      console.log('Connected to AIS stream');
      socketHandler(ws, ais)
    })

    ais.on('error', (error) => {
      console.log('AIS stream error:', error);
    })
    
  });

  wss.on("close", () => {
    console.log("Client disconnected");
  });

  wss.on("error", (error) => {
    console.log("WebSocket error:", error);
  });

  return wss;
}

initHTTPServer();
initWSServer();
