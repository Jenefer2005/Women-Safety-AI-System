import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import SafetyStatus from "../components/SafetyStatus";
import SensorCard from "../components/SensorCard";
import SensorChart from "../components/SensorChart";
import AlertCard from "../components/AlertCard";

import socket from "../services/socket";

const Dashboard = () => {

  // ===============================
  // SENSOR DATA
  // ===============================

  const [sensorData, setSensorData] = useState({
    heartRate: 82,
    gsr: 430,
    movement: "Normal",
    temperature: 36.6
  });


  // ===============================
  // SAFETY STATUS
  // ===============================

  const [status, setStatus] = useState("SAFE");


  // ===============================
  // CHART DATA
  // ===============================

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


  // ===============================
  // SOCKET CONNECTION
  // ===============================

  useEffect(() => {

    socket.on("sensorUpdate", (data) => {

      console.log("Received sensor data:", data);


      // Update sensor cards

      setSensorData({

        heartRate: data.heartRate,

        gsr: data.gsr,

        movement: data.movement,

        temperature: data.temperature

      });


      // Update safety status

      setStatus(data.status);


      // Update chart

      setChartData((previous) => {

        const now = new Date();

        const time =
          now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          });


        const newPoint = {

          time: time,

          heartRate: data.heartRate,

          gsr: data.gsr,

          temperature: data.temperature

        };


        // Keep only the latest 10 readings

        return [
          ...previous,
          newPoint
        ].slice(-10);

      });

    });


    // Cleanup socket listener

    return () => {

      socket.off("sensorUpdate");

    };

  }, []);


  // ===============================
  // DASHBOARD UI
  // ===============================

  return (

    <div className="app-layout">

      <Sidebar />


      <main className="main-content">

        <Navbar />


        <h1>
          Dashboard
        </h1>


        <p>
          Overview of real-time safety status
        </p>


        {/* SAFETY STATUS */}

        <SafetyStatus
          status={status}
        />

        <AlertCard
            status={status}
             message={
             status === "ALERT"
             ? "Unusual activity detected."
             : ""
            }
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


        {/* SENSOR CHART */}

        <SensorChart
          data={chartData}
        />

      </main>

    </div>

  );

};

export default Dashboard;
