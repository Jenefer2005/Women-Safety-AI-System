const SensorReading = require("../models/SensorReading");
const Device = require("../models/Device");

exports.addSensorData = async (req, res) => {
  try {
    const {
      deviceId,
      heartRate,
      gsr,
      accelerationX,
      accelerationY,
      accelerationZ,
      movement,
      temperature
    } = req.body;

    if (
      !deviceId ||
      typeof heartRate !== "number" ||
      typeof gsr !== "number"
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid sensor data"
      });
    }

    const reading = await SensorReading.create({
      deviceId,
      heartRate,
      gsr,
      accelerationX,
      accelerationY,
      accelerationZ,
      movement,
      temperature
    });

    await Device.findOneAndUpdate(
      { deviceId },
      {
        status: "ONLINE",
        lastSeen: new Date()
      },
      {
        upsert: true,
        new: true
      }
    );

    if (req.io) {
      req.io.emit("sensorUpdate", reading);
    }

    res.status(201).json({
      success: true,
      data: reading
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getLatestSensor = async (req, res) => {
  try {
    const reading = await SensorReading.findOne({
      deviceId: req.params.deviceId
    }).sort({ timestamp: -1 });

    res.json({
      success: true,
      data: reading
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getSensorHistory = async (req, res) => {
  try {
    const readings = await SensorReading.find({
      deviceId: req.params.deviceId
    })
      .sort({ timestamp: -1 })
      .limit(100);

    res.json({
      success: true,
      data: readings
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};