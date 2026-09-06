const SensorCard = ({ title, value, unit, icon }) => {
  return (
    <div className="sensor-card">

      <div className="sensor-icon">
        {icon}
      </div>

      <div className="sensor-content">

        <h3>{title}</h3>

        <div className="sensor-value">
          {value}
          <span>{unit}</span>
        </div>

        <div className="sensor-status">
          ● Live
        </div>

      </div>

    </div>
  );
};

export default SensorCard;