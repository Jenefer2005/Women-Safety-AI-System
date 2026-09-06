const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      default: "WS001"
    },

    type: {
      type: String,
      default: "AI"
    },

    threatLevel: {
      type: String,
      enum: ["SAFE", "ALERT", "DANGER"],
      default: "ALERT"
    },

    heartRate: {
      type: Number,
      required: true
    },

    gsr: {
      type: Number,
      required: true
    },

    movement: {
      type: String,
      required: true
    },

    temperature: {
      type: Number
    },

    latitude: {
      type: Number
    },

    longitude: {
      type: Number
    },

    message: {
      type: String,
      default: "Unusual activity detected."
    },

    timestamp: {
      type: Date,
      default: Date.now
    },

    status: {
      type: String,
      enum: ["ACTIVE", "RESOLVED"],
      default: "ACTIVE"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Alert", alertSchema);