import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import socket from "../services/socket";

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {

    // ===============================
    // LOAD ALERTS FROM MONGODB
    // ===============================

    const fetchAlerts = async () => {
      try {
        const API_URL =
        import.meta.env.VITE_API_URL || "http://localhost:5000";

        const response = await fetch(
        `${API_URL}/api/alerts`
      );

        const data = await response.json();

        setAlerts(data);

      } catch (error) {
        console.error(
          "Failed to load alerts:",
          error
        );
      }
    };

    fetchAlerts();


    // ===============================
    // LISTEN FOR NEW ALERT
    // ===============================

    const handleNewAlert = (newAlert) => {

      setAlerts((previous) => {

        // Prevent duplicate alerts
        const alreadyExists = previous.some(
          (alert) => alert._id === newAlert._id
        );

        if (alreadyExists) {
          return previous;
        }

        return [
          newAlert,
          ...previous
        ].slice(0, 20);

      });

    };


    socket.on(
      "alertCreated",
      handleNewAlert
    );


    // ===============================
    // CLEANUP
    // ===============================

    return () => {

      socket.off(
        "alertCreated",
        handleNewAlert
      );

    };

  }, []);


  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <h1>Alerts</h1>

        <p>
          Monitor safety alerts detected by the wearable device
        </p>


        {/* NO ALERTS */}

        {alerts.length === 0 && (

          <div className="no-alerts">

            <div className="no-alert-icon">
              🛡️
            </div>

            <h2>No Alerts</h2>

            <p>
              No abnormal activity has been detected yet.
            </p>

          </div>

        )}


        {/* ALERT LIST */}

        {alerts.length > 0 && (

          <div className="alerts-list">

            {alerts.map((alert) => (

              <div
                className="alert-history-card"
                key={alert._id}
              >

                <div className="alert-history-icon">
                  🚨
                </div>


                <div className="alert-history-content">

                  <h3>
                    Safety Alert
                  </h3>

                  <p>
                    {alert.message}
                  </p>


                  <div className="alert-sensor-data">

                    <span>
                      ❤️ {alert.heartRate} BPM
                    </span>

                    <span>
                      ✋ {alert.gsr} μS
                    </span>

                    <span>
                      🏃 {alert.movement}
                    </span>

                    <span>
                      🌡️ {alert.temperature} °C
                    </span>

                  </div>

                </div>


                <div className="alert-history-time">

                  {new Date(
                    alert.timestamp
                  ).toLocaleTimeString()}

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
};

export default Alerts;