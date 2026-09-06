import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import socket from "../services/socket";

const Device = () => {
  const [sensorData, setSensorData] = useState({
    heartRate: 82,
    gsr: 430,
    movement: "Normal",
    temperature: 36.6
  });

  const [deviceOnline, setDeviceOnline] = useState(true);

  useEffect(() => {
    const handleSensorUpdate = (data) => {
      setSensorData({
        heartRate: data.heartRate,
        gsr: data.gsr,
        movement: data.movement,
        temperature: data.temperature
      });

      setDeviceOnline(true);
    };

    socket.on("sensorUpdate", handleSensorUpdate);

    return () => {
      socket.off("sensorUpdate", handleSensorUpdate);
    };
  }, []);

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">

        {/* HEADER */}
        <div className="device-header">
          <div>
            <h1>Device</h1>
            <p>Manage and monitor your wearable device</p>
          </div>

          <div className="device-online-badge">
            <span></span>
            {deviceOnline ? "DEVICE ONLINE" : "DEVICE OFFLINE"}
          </div>
        </div>

        {/* DEVICE OVERVIEW */}
        <div className="device-overview">

          <div className="device-main-card">
            <div className="device-icon-large">
              📱
            </div>

            <div>
              <span className="device-label">
                WEARABLE DEVICE
              </span>

              <h2>WS-001</h2>

              <p>
                Smart Women Safety Wearable
              </p>

              <div className="device-status-line">
                <span className="status-dot"></span>
                Connected and working
              </div>
            </div>
          </div>

          <div className="battery-card">
            <div className="battery-icon">
              🔋
            </div>

            <div>
              <span>BATTERY</span>
              <strong>78%</strong>
              <p>Good battery level</p>
            </div>
          </div>
        </div>

        {/* DEVICE INFORMATION */}
        <div className="device-section">

          <div className="section-title">
            <h2>Device Information</h2>
            <p>Current wearable device details</p>
          </div>

          <div className="device-info-grid">

            <div className="device-info-card">
              <span>Device ID</span>
              <strong>WS-001</strong>
            </div>

            <div className="device-info-card">
              <span>Controller</span>
              <strong>ESP32-S3</strong>
            </div>

            <div className="device-info-card">
              <span>Firmware</span>
              <strong>v1.0.0</strong>
            </div>

            <div className="device-info-card">
              <span>Connection</span>
              <strong>Wi-Fi</strong>
            </div>

          </div>
        </div>

        {/* SENSOR STATUS */}
        <div className="device-section">

          <div className="section-title">
            <h2>Sensor Status</h2>
            <p>Connected sensors in the wearable</p>
          </div>

          <div className="sensor-status-grid">

            <div className="sensor-status-card">
              <div className="sensor-status-icon">
                ❤️
              </div>

              <div>
                <h3>MAX30102</h3>
                <p>Heart Rate Sensor</p>
              </div>

              <span className="sensor-connected">
                ● Connected
              </span>
            </div>

            <div className="sensor-status-card">
              <div className="sensor-status-icon">
                🏃
              </div>

              <div>
                <h3>MPU6050</h3>
                <p>Motion Sensor</p>
              </div>

              <span className="sensor-connected">
                ● Connected
              </span>
            </div>

            <div className="sensor-status-card">
              <div className="sensor-status-icon">
                ✋
              </div>

              <div>
                <h3>GSR</h3>
                <p>Stress Sensor</p>
              </div>

              <span className="sensor-connected">
                ● Connected
              </span>
            </div>

            <div className="sensor-status-card">
              <div className="sensor-status-icon">
                🌡️
              </div>

              <div>
                <h3>Temperature</h3>
                <p>Body Temperature</p>
              </div>

              <span className="sensor-connected">
                ● Connected
              </span>
            </div>

            <div className="sensor-status-card">
              <div className="sensor-status-icon">
                📍
              </div>

              <div>
                <h3>GPS</h3>
                <p>Location Sensor</p>
              </div>

              <span className="sensor-connected">
                ● Connected
              </span>
            </div>

            <div className="sensor-status-card">
              <div className="sensor-status-icon">
                📡
              </div>

              <div>
                <h3>GSM</h3>
                <p>Emergency Communication</p>
              </div>

              <span className="sensor-connected">
                ● Ready
              </span>
            </div>

          </div>
        </div>

        {/* LIVE SENSOR SUMMARY */}
        <div className="device-live-card">

          <div className="section-title">
            <h2>Live Sensor Summary</h2>
            <p>Real-time values received from the wearable</p>
          </div>

          <div className="device-live-grid">

            <div>
              <span>❤️ Heart Rate</span>
              <strong>{sensorData.heartRate} BPM</strong>
            </div>

            <div>
              <span>✋ GSR</span>
              <strong>{sensorData.gsr} μS</strong>
            </div>

            <div>
              <span>🏃 Movement</span>
              <strong>{sensorData.movement}</strong>
            </div>

            <div>
              <span>🌡️ Temperature</span>
              <strong>{sensorData.temperature} °C</strong>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
};

export default Device;