import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

const History = () => {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  // =========================================
  // FETCH ALERT HISTORY FROM MONGODB
  // =========================================

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/alerts"
        );

        const data = await response.json();

        setAlerts(data);
      } catch (error) {
        console.error(
          "Failed to load history:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);


  // =========================================
  // FILTER ALERTS
  // =========================================

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === "ALL") {
      return true;
    }

    return alert.status === filter;
  });


  // =========================================
  // TOTAL ALERTS
  // =========================================

  const totalAlerts = alerts.length;


  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">


        {/* ================================= */}
        {/* PAGE HEADER */}
        {/* ================================= */}

        <div className="history-header">

          <div>

            <h1>History</h1>

            <p>
              Review previous safety events and sensor activity
            </p>

          </div>

        </div>


        {/* ================================= */}
        {/* TOTAL ALERTS */}
        {/* ================================= */}

        <div className="history-summary">

          <div className="history-summary-card">

            <div className="history-summary-icon">
              📋
            </div>

            <div>

              <span>
                Total Alerts
              </span>

              <strong>
                {totalAlerts}
              </strong>

            </div>

          </div>

        </div>


        {/* ================================= */}
        {/* HISTORY TOOLBAR */}
        {/* ================================= */}

        <div className="history-toolbar">

          <div>

            <h2>
              Safety Event History
            </h2>

            <p>
              All recorded alerts from your wearable device
            </p>

          </div>


          {/* FILTERS */}

          <div className="history-filters">

            <button
              className={
                filter === "ALL"
                  ? "history-filter active"
                  : "history-filter"
              }
              onClick={() => setFilter("ALL")}
            >
              All
            </button>


            <button
              className={
                filter === "ACTIVE"
                  ? "history-filter active"
                  : "history-filter"
              }
              onClick={() => setFilter("ACTIVE")}
            >
              Active
            </button>


            <button
              className={
                filter === "RESOLVED"
                  ? "history-filter active"
                  : "history-filter"
              }
              onClick={() => setFilter("RESOLVED")}
            >
              Resolved
            </button>

          </div>

        </div>


        {/* ================================= */}
        {/* HISTORY TABLE */}
        {/* ================================= */}

        <div className="history-table-card">

          {loading ? (

            <div className="history-empty">

              Loading history...

            </div>

          ) : filteredAlerts.length === 0 ? (

            <div className="history-empty">

              <div className="history-empty-icon">
                📜
              </div>

              <h3>
                No History Found
              </h3>

              <p>
                There are no safety events for this filter.
              </p>

            </div>

          ) : (

            <div className="history-table-wrapper">

              <table className="history-table">

                <thead>

                  <tr>

                    <th>
                      Date & Time
                    </th>

                    <th>
                      Threat
                    </th>

                    <th>
                      Heart Rate
                    </th>

                    <th>
                      GSR
                    </th>

                    <th>
                      Movement
                    </th>

                    <th>
                      Status
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {filteredAlerts.map((alert) => (

                    <tr key={alert._id}>


                      {/* DATE & TIME */}

                      <td>

                        <div className="history-date">

                          <strong>
                            {new Date(
                              alert.timestamp
                            ).toLocaleDateString()}
                          </strong>

                          <span>
                            {new Date(
                              alert.timestamp
                            ).toLocaleTimeString()}
                          </span>

                        </div>

                      </td>


                      {/* THREAT */}

                      <td>

                        <div className="threat-cell">

                          <span className="threat-icon">
                            🚨
                          </span>

                          <div>

                            <strong>
                              {alert.threatLevel}
                            </strong>

                            <span>
                              {alert.type}
                            </span>

                          </div>

                        </div>

                      </td>


                      {/* HEART RATE */}

                      <td>
                        ❤️ {alert.heartRate} BPM
                      </td>


                      {/* GSR */}

                      <td>
                        ✋ {alert.gsr} μS
                      </td>


                      {/* MOVEMENT */}

                      <td>
                        🏃 {alert.movement}
                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={
                            alert.status === "ACTIVE"
                              ? "history-status active"
                              : "history-status resolved"
                          }
                        >

                          {alert.status === "ACTIVE"
                            ? "● Active"
                            : "✓ Resolved"}

                        </span>

                      </td>


                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>


        {/* ================================= */}
        {/* INFORMATION */}
        {/* ================================= */}

        <div className="history-info">

          <span>
            ℹ️
          </span>

          <p>
            History is automatically updated from safety
            alerts recorded by the wearable device.
          </p>

        </div>


      </main>

    </div>
  );
};

export default History;