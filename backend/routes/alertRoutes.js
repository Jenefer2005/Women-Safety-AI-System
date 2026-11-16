
const express = require("express");
const router = express.Router();

const Alert = require("../models/Alert");

// GET all alerts
router.get("/", async (req, res) => {
  try {
    const alerts = await Alert.find().sort({ timestamp: -1 });
    res.json(alerts);
  } catch (error) {
    console.error("Error fetching alerts:", error);

    res.status(500).json({
      message: "Failed to fetch alerts"
    });
  }
});

// GET one alert
router.get("/:id", async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);

    if (!alert) {
      return res.status(404).json({
        message: "Alert not found"
      });
    }

    res.json(alert);
  } catch (error) {
    console.error("Error fetching alert:", error);

    res.status(500).json({
      message: "Failed to fetch alert"
    });
  }
});

// POST new SOS alert
router.post("/", async (req, res) => {
  try {
    const alert = new Alert({
      deviceId: req.body.deviceId || "WS001",
      type: req.body.type || "SOS",
      threatLevel: req.body.threatLevel || "DANGER",
      heartRate: req.body.heartRate,
      gsr: req.body.gsr,
      movement: req.body.movement,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      message: req.body.message || "SOS Emergency! Help required.",
      status: "ACTIVE"
    });

    // Save alert to MongoDB
    const savedAlert = await alert.save();

    console.log("SOS SAVED TO DATABASE:", savedAlert);

    // Send alert to React dashboard
    const io = req.app.get("io");

    if (io) {
      console.log("SOS EVENT EMITTED:", savedAlert);
      io.emit("alertCreated", savedAlert);
    } else {
      console.log("Socket.IO not available");
    }

    res.status(201).json({
      success: true,
      message: "SOS alert created successfully",
      alert: savedAlert
    });

  } catch (error) {
    console.error("Error creating alert:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create alert",
      error: error.message
    });
  }
});

// Resolve alert
router.put("/:id/resolve", async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      { status: "RESOLVED" },
      { new: true }
    );

    if (!alert) {
      return res.status(404).json({
        message: "Alert not found"
      });
    }

    res.json(alert);

  } catch (error) {
    console.error("Error resolving alert:", error);

    res.status(500).json({
      message: "Failed to resolve alert"
    });
  }
});

module.exports = router;
