import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import userRouter from "./src/routes/userRouter.js";
import { startWSServer } from "./src/ws/wsServer.js";
import documentRouter from "./src/routes/document.routes.js";

dotenv.config();

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/user", userRouter);

app.use("/api", documentRouter);

app.use("/api", collaborationRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("Server running 🚀");
});

// Start HTTP server
app.listen(process.env.PORT, () => {
  console.log(`HTTP server running on http://localhost:${process.env.PORT}`);
});

// Start WebSocket server
startWSServer(process.env.WS_PORT);


