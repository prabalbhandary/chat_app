import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import "colors";
import morgan from "morgan";
import path from "path";
import fs from "fs";

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const MODE = process.env.NODE_ENV || "production";
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/messages", messageRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  const indexPath = path.join(__dirname, "../client", "dist", "index.html");
  if (fs.existsSync(indexPath)) {
    app.get("*", (req, res) => {
      res.sendFile(indexPath);
    });
  } else {
    console.error("Frontend build directory not found");
  }
}

server.listen(PORT, () => {
  console.log(`Server running on ${MODE} mode on http://localhost:${PORT}`.bgMagenta.white);
  connectDB();
});
