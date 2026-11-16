
import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SafetyStatus from "../components/SafetyStatus";
import SensorCard from "../components/SensorCard";
import SensorChart from "../components/SensorChart";
import AlertCard from "../components/AlertCard";

import socket from "../services/socket";

const Dashboard = () => {

  const [sensorData, setSensorData] = useState({
    heartRate: 82,
    gsr: 430,
    movement: "Normal",
    temperature: 36.6
  });

  const [status, setStatus] = useState("SAFE");

  const [alertMessage, setAlertMessage] = useState("");

  const [chartData, setChartData] = useState([
    {
      time: "10:00",
      heartRate: 78,
      gsr: 410,
      temperature: 36.5
    },
    {
      time: "10:05",
      heartRate: 80,
      gsr: 425,
      temperature: 36.6
    },
    {
      time: "10:10",
      heartRate: 82,
      gsr: 430,
      temperature: 36.6
    },
    {
      time: "10:15",
      heartRate: 84,
      gsr: 445,
      temperature: 36.7
    }
  ]);

  // Listen for ESP32 SOS alerts
  useEffect(() => {

    const handleSOS = (alert) => {

      console.log("SOS received:", alert);

      if (
        alert.type === "SOS" ||
        alert.threatLevel === "DANGER"
      ) {
        setStatus("DANGER");

        setAlertMessage(
          alert.message || "SOS Emergency! Help required."
        );
      }

    };

    socket.on("alertCreated", handleSOS);

    return () => {
      socket.off("alertCreated", handleSOS);
    };

  }, []);

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Navbar />

        <h1>Dashboard</h1>

        <p>Overview of real-time safety status</p>

        {/* SAFETY STATUS */}

        <SafetyStatus status={status} />

        <AlertCard
          status={status}
          message={alertMessage}
        />

        {/* SENSOR CARDS */}

        <div className="sensor-grid">

          <SensorCard
            title="Heart Rate"
            value={sensorData.heartRate}
            unit=" BPM"
            icon="❤️"
          />

          <SensorCard
            title="GSR (Stress)"
            value={sensorData.gsr}
            unit=" μS"
            icon="✋"
          />

          <SensorCard
            title="Movement"
            value={sensorData.movement}
            unit=""
            icon="🏃"
          />

          <SensorCard
            title="Temperature"
            value={sensorData.temperature}
            unit=" °C"
            icon="🌡️"
          />

        </div>

        <SensorChart data={chartData} />

      </main>

    </div>
  );
};

export default Dashboard;
