const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const sensorRoutes = require("./routes/sensorRoutes");
const alertRoutes = require("./routes/alertRoutes");
const Alert = require("./models/Alert");

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);

// ===============================
// MIDDLEWARE
// ===============================

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

// ===============================
// SOCKET.IO
// ===============================

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

// ===============================
// BASIC ROUTES
// ===============================

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

// ===============================
// API ROUTES
// ===============================

app.use("/api/auth", authRoutes);
app.use("/api/sensors", sensorRoutes);
app.use("/api/alerts", alertRoutes);

// ===============================
// SOCKET CONNECTION
// ===============================

io.on("connection", (socket) => {

  console.log("Dashboard connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Dashboard disconnected:", socket.id);
  });

});

// ===============================
// FAKE SENSOR DATA + ALERT
// ===============================

// Keep track of previous safety status
let previousStatus = "SAFE";

setInterval(async () => {

  // ===============================
  // GENERATE FAKE SENSOR VALUES
  // ===============================

  const heartRate =
    Math.floor(Math.random() * 51) + 70;

  const gsr =
    Math.floor(Math.random() * 401) + 300;

  const movement =
    Math.random() > 0.8
      ? "High"
      : "Normal";

  const temperature =
    Number(
      (36 + Math.random() * 1.5).toFixed(1)
    );


  // ===============================
  // ALERT DETECTION
  // ===============================

  let status = "SAFE";

  let alertMessage =
    "No abnormal activity detected.";

  if (
    heartRate > 100 ||
    gsr > 500 ||
    movement === "High"
  ) {

    status = "ALERT";

    alertMessage =
      "Unusual activity detected.";

  }


  // ===============================
  // SENSOR OBJECT
  // ===============================

  const sensorData = {

    heartRate: heartRate,

    gsr: gsr,

    movement: movement,

    temperature: temperature,

    status: status,

    alertMessage: alertMessage,

    timestamp: new Date().toISOString()

  };


  // ===============================
  // SHOW DATA IN TERMINAL
  // ===============================

  console.log("Sensor Data:", sensorData);


  // ===============================
  // SEND DATA TO REACT DASHBOARD
  // ===============================

  io.emit("sensorUpdate", sensorData);


  // ===============================
  // SAVE ALERT TO MONGODB
  // ===============================

  if (
    status === "ALERT" &&
    previousStatus !== "ALERT"
  ) {

    try {

      const savedAlert = await Alert.create({

        deviceId: "WS001",

        type: "AI",

        threatLevel: "ALERT",

        heartRate: heartRate,

        gsr: gsr,

        movement: movement,

        temperature: temperature,

        message: alertMessage,

        timestamp: new Date(),

        status: "ACTIVE"

      });


      console.log(
        "🚨 Alert saved to MongoDB:",
        savedAlert._id
      );


      // Send new alert to React immediately
      io.emit(
        "alertCreated",
        savedAlert
      );


    } catch (error) {

      console.error(
        "❌ Failed to save alert:",
        error.message
      );

    }

  }


  // Update previous status
  previousStatus = status;


}, 3000);


// ===============================
// START SERVER
// ===============================

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});