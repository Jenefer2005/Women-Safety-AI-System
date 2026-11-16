
const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const sensorRoutes = require("./routes/sensorRoutes");
const alertRoutes = require("./routes/alertRoutes");

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);

// MIDDLEWARE
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.CLIENT_URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());

// SOCKET.IO
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      process.env.CLIENT_URL
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.set("io", io);

// BASIC ROUTES
app.get("/", (req, res) => {
  res.json({
    message: "Women Safety AI Backend Running"
  });
});

app.get("/debug", (req, res) => {
  res.json({
    message: "Server is working"
  });
});

// API ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/sensors", sensorRoutes);
app.use("/api/alerts", alertRoutes);

// SOCKET CONNECTION
io.on("connection", (socket) => {
  console.log("Dashboard connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Dashboard disconnected:", socket.id);
  });
});

// NO AUTOMATIC SENSOR SIMULATION
// SOS alerts will come only from the ESP32 button.

// START SERVER
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
