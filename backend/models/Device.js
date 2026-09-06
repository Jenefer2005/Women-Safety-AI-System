const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    deviceId: {
      type: String,
      required: true,
      unique: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    status: {
      type: String,
      enum: ["ONLINE", "OFFLINE"],
      default: "OFFLINE"
    },

    lastSeen: {
      type: Date
    },

    wifiStatus: {
      type: String,
      default: "UNKNOWN"
    },

    gpsStatus: {
      type: String,
      default: "UNKNOWN"
    },

    gsmStatus: {
      type: String,
      default: "UNKNOWN"
    },

    battery: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Device", deviceSchema);