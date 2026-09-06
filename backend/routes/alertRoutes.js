const express = require("express");
const router = express.Router();

const Alert = require("../models/Alert");

// GET all alerts
router.get("/", async (req, res) => {
  try {
    const alerts = await Alert.find()
      .sort({ timestamp: -1 });

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

// POST new alert
router.post("/", async (req, res) => {
  try {
    const alert = new Alert(req.body);

    const savedAlert = await alert.save();

    res.status(201).json(savedAlert);
  } catch (error) {
    console.error("Error creating alert:", error);

    res.status(500).json({
      message: "Failed to create alert"
    });
  }
});

// Resolve alert
router.put("/:id/resolve", async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      {
        status: "RESOLVED"
      },
      {
        new: true
      }
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