const SafetyStatus = ({ status }) => {

  const statusData = {
    SAFE: {
      className: "safe",
      message: "No abnormal activity detected."
    },

    ALERT: {
      className: "alert",
      message: "Unusual activity detected."
    },

    DANGER: {
      className: "danger",
      message: "Emergency condition detected."
    }
  };

  const current = statusData[status] || statusData.SAFE;

  return (
    <div className={`safety-status ${current.className}`}>

      {/* Shield */}
      <div className="shield">
        🛡️
      </div>

      {/* Status Information */}
      <div className="safety-info">

        <p>CURRENT STATUS</p>

        <h1>{status}</h1>

        <span>{current.message}</span>

      </div>

      {/* Woman placeholder */}
      <div className="safety-person">
        👩🏻
      </div>

      {/* Device Status */}
      <div className="device-status">

        <div className="status-row">
          <span>🟢</span>
          <span>Device Status</span>
          <strong>ONLINE</strong>
        </div>

        <div className="status-row">
          <span>🟢</span>
          <span>GPS Status</span>
          <strong>AVAILABLE</strong>
        </div>

        <div className="status-row">
          <span>🟢</span>
          <span>Internet</span>
          <strong>CONNECTED</strong>
        </div>

        <div className="status-row">
          <span>🟢</span>
          <span>Battery</span>
          <strong>82%</strong>
        </div>

      </div>

    </div>
  );
};

export default SafetyStatus;