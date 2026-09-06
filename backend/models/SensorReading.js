const mongoose = require("mongoose");

const sensorSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true
  },

  heartRate: {
    type: Number,
    required: true
  },

  gsr: {
    type: Number,
    required: true
  },

  accelerationX: Number,
  accelerationY: Number,
  accelerationZ: Number,

  movement: {
    type: String,
    default: "Normal"
  },

  temperature: Number,

  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("SensorReading", sensorSchema);