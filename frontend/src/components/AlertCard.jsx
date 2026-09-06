const AlertCard = ({ status, message }) => {

  if (status !== "ALERT") {
    return null;
  }

  return (

    <div className="alert-card">

      <div className="alert-icon">
        🚨
      </div>

      <div className="alert-content">

        <h3>
          Safety Alert
        </h3>

        <p>
          {message}
        </p>

      </div>

      <div className="alert-time">
        NOW
      </div>

    </div>

  );

};

export default AlertCard;