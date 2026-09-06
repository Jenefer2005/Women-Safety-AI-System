import { useState } from "react";
import Sidebar from "../components/Sidebar";

const Settings = () => {
  const [automaticSOS, setAutomaticSOS] = useState(true);
  const [aiDetection, setAiDetection] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [gsm, setGsm] = useState(true);
  const [wifi, setWifi] = useState(true);

  const [heartRateLimit, setHeartRateLimit] = useState(100);
  const [gsrLimit, setGsrLimit] = useState(500);

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">

        {/* HEADER */}
        <div className="settings-header">
          <div>
            <h1>Settings</h1>
            <p>
              Configure safety, alert and communication preferences
            </p>
          </div>
        </div>

        {/* AI SAFETY */}
        <div className="settings-card">

          <div className="settings-card-header">
            <div className="settings-card-icon">
              🤖
            </div>

            <div>
              <h2>AI Safety Detection</h2>
              <p>
                Configure AI-based threat detection
              </p>
            </div>
          </div>

          <div className="setting-row">

            <div>
              <strong>AI Threat Detection</strong>
              <span>
                Automatically analyze sensor data for threats
              </span>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={aiDetection}
                onChange={() =>
                  setAiDetection(!aiDetection)
                }
              />
              <span className="slider"></span>
            </label>

          </div>

          <div className="setting-row">

            <div>
              <strong>Automatic SOS</strong>
              <span>
                Automatically trigger SOS during high-risk situations
              </span>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={automaticSOS}
                onChange={() =>
                  setAutomaticSOS(!automaticSOS)
                }
              />
              <span className="slider"></span>
            </label>

          </div>

        </div>

        {/* ALERT THRESHOLDS */}
        <div className="settings-card">

          <div className="settings-card-header">
            <div className="settings-card-icon">
              🚨
            </div>

            <div>
              <h2>Alert Thresholds</h2>
              <p>
                Set sensor limits used for safety alerts
              </p>
            </div>
          </div>

          <div className="threshold-grid">

            <div className="threshold-item">
              <label>
                ❤️ Heart Rate Threshold
              </label>

              <div className="threshold-input">
                <input
                  type="number"
                  value={heartRateLimit}
                  onChange={(e) =>
                    setHeartRateLimit(e.target.value)
                  }
                />

                <span>BPM</span>
              </div>

              <small>
                Alert when heart rate exceeds this value
              </small>
            </div>

            <div className="threshold-item">
              <label>
                ✋ GSR Threshold
              </label>

              <div className="threshold-input">
                <input
                  type="number"
                  value={gsrLimit}
                  onChange={(e) =>
                    setGsrLimit(e.target.value)
                  }
                />

                <span>μS</span>
              </div>

              <small>
                Alert when GSR exceeds this value
              </small>
            </div>

          </div>

        </div>

        {/* COMMUNICATION */}
        <div className="settings-card">

          <div className="settings-card-header">
            <div className="settings-card-icon">
              📡
            </div>

            <div>
              <h2>Communication</h2>
              <p>
                Manage communication methods
              </p>
            </div>
          </div>

          <div className="setting-row">

            <div>
              <strong>Wi-Fi</strong>
              <span>
                Send wearable data through Wi-Fi
              </span>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={wifi}
                onChange={() => setWifi(!wifi)}
              />
              <span className="slider"></span>
            </label>

          </div>

          <div className="setting-row">

            <div>
              <strong>GSM</strong>
              <span>
                Enable emergency GSM communication
              </span>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={gsm}
                onChange={() => setGsm(!gsm)}
              />
              <span className="slider"></span>
            </label>

          </div>

          <div className="setting-row">

            <div>
              <strong>Notifications</strong>
              <span>
                Receive safety alert notifications
              </span>
            </div>

            <label className="switch">
              <input
                type="checkbox"
                checked={notifications}
                onChange={() =>
                  setNotifications(!notifications)
                }
              />
              <span className="slider"></span>
            </label>

          </div>

        </div>

        {/* SAVE */}
        <button
          className="save-settings-button"
          onClick={handleSave}
        >
          💾 Save Settings
        </button>

      </main>
    </div>
  );
};

export default Settings;