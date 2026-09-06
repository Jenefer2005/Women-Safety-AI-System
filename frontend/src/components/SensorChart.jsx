import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const SensorChart = ({ data }) => {

  return (
    <div className="sensor-chart-card">

      <div className="chart-header">

        <div>
          <h2>Live Sensor Trends</h2>

          <p>
            Real-time monitoring of wearable sensors
          </p>
        </div>

        <div className="live-indicator">

          <span></span>

          LIVE

        </div>

      </div>


      <div className="chart-container">

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <LineChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="time"
            />

            <YAxis />

            <Tooltip />


            <Line
              type="monotone"
              dataKey="heartRate"
              stroke="#ef2b72"
              strokeWidth={2}
              dot={false}
              name="Heart Rate"
            />


            <Line
              type="monotone"
              dataKey="gsr"
              stroke="#36df67"
              strokeWidth={2}
              dot={false}
              name="GSR"
            />


            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#e5b52b"
              strokeWidth={2}
              dot={false}
              name="Temperature"
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};


export default SensorChart;