const express = require("express");

const {
  addSensorData,
  getLatestSensor,
  getSensorHistory
} = require("../controllers/sensorController");

const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Sensor routes are working"
  });
});

router.post("/", addSensorData);

router.get("/latest/:deviceId", getLatestSensor);

router.get("/history/:deviceId", getSensorHistory);

module.exports = router;