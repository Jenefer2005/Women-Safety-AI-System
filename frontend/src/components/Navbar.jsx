import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const notificationRef = useRef(null);

  const [user, setUser] = useState({
    name: "Guardian",
    role: "Administrator",
    profilePhoto: ""
  });

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const [alerts, setAlerts] = useState([]);

  const [showNotifications, setShowNotifications] = useState(false);


  // =====================================
  // LOAD USER
  // =====================================

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {

      try {

        const parsedUser = JSON.parse(storedUser);

        setUser({
          name: parsedUser.name || "Guardian",

          role:
            parsedUser.role === "admin"
              ? "Administrator"
              : parsedUser.role || "Guardian",

          profilePhoto:
            parsedUser.profilePhoto ||
            parsedUser.avatar ||
            parsedUser.photo ||
            parsedUser.profileImage ||
            ""
        });

      } catch (error) {

        console.error("Unable to read user:", error);

      }

    }

  }, []);


  // =====================================
  // LIVE DATE & TIME
  // =====================================

  useEffect(() => {

    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);

  }, []);


  // =====================================
  // LOAD ALERTS FROM MONGODB
  // =====================================

  useEffect(() => {

    const fetchAlerts = async () => {

      try {

        const API_URL =
        import.meta.env.VITE_API_URL ||
        "https://women-safety-ai-system.onrender.com";

        const response = await fetch(
        `${API_URL}/api/alerts`
        );

        if (!response.ok) {
          console.error(
            "Failed to fetch alerts:",
            response.status
          );
          return;
        }

        const data = await response.json();

        console.log("Navbar alerts:", data);

        if (Array.isArray(data)) {

          setAlerts(data);

        } else if (Array.isArray(data.alerts)) {

          setAlerts(data.alerts);

        } else {

          setAlerts([]);

        }

      } catch (error) {

        console.error(
          "Error loading alerts:",
          error
        );

      }

    };


    // Load immediately

    fetchAlerts();


    // Check for newly saved alerts

    const interval = setInterval(() => {

      fetchAlerts();

    }, 5000);


    return () => clearInterval(interval);

  }, []);


  // =====================================
  // CLOSE NOTIFICATION WHEN CLICKING OUTSIDE
  // =====================================

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {

        setShowNotifications(false);

      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);


  // =====================================
  // DATE
  // =====================================

  const formattedDate =
    currentDateTime.toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );


  // =====================================
  // TIME
  // =====================================

  const formattedTime =
    currentDateTime.toLocaleTimeString(
      "en-US",
      {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }
    );


  // =====================================
  // USER INITIAL
  // =====================================

  const userInitial =
    user.name?.trim()?.charAt(0)?.toUpperCase() || "G";


  // =====================================
  // NOTIFICATION CLICK
  // =====================================

  const handleNotificationClick = () => {

    setShowNotifications((previous) => !previous);

  };


  // =====================================
  // OPEN ALERTS PAGE
  // =====================================

  const openAlertsPage = () => {

    setShowNotifications(false);

    navigate("/alerts");

  };


  return (

    <header className="navbar">

      <div className="navbar-right">


        {/* =================================
            NOTIFICATION
        ================================= */}

        <div
          className="notification-wrapper"
          ref={notificationRef}
        >

          <button
            className="notification"
            onClick={handleNotificationClick}
            type="button"
          >

            🔔

            {alerts.length > 0 && (

              <span>
                {alerts.length > 99
                  ? "99+"
                  : alerts.length}
              </span>

            )}

          </button>


          {/* =================================
              NOTIFICATION DROPDOWN
          ================================= */}

          {showNotifications && (

            <div className="notification-dropdown">

              <div className="notification-header">

                <strong>
                  Notifications
                </strong>

                <span>
                  {alerts.length} alert
                  {alerts.length !== 1 ? "s" : ""}
                </span>

              </div>


              {/* NO ALERTS */}

              {alerts.length === 0 && (

                <div className="empty-notifications">

                  <div>
                    🛡️
                  </div>

                  <p>
                    No alerts
                  </p>

                  <small>
                    No abnormal activity detected.
                  </small>

                </div>

              )}


              {/* ALERTS */}

              {alerts.length > 0 && (

                <div className="notification-list">

                  {alerts.slice(0, 5).map((alert) => (

                    <div
                      className="notification-item"
                      key={alert._id}
                      onClick={openAlertsPage}
                    >

                      <div className="notification-alert-icon">
                        🚨
                      </div>


                      <div className="notification-content">

                        <strong>
                          Safety Alert
                        </strong>

                        <p>
                          {alert.message || "Unusual activity detected."}
                        </p>

                        <small>
                          {alert.timestamp
                            ? new Date(
                                alert.timestamp
                              ).toLocaleTimeString()
                            : "Recently"}
                        </small>

                      </div>

                    </div>

                  ))}

                </div>

              )}


              {/* VIEW ALL */}

              {alerts.length > 0 && (

                <button
                  className="view-all-notifications"
                  onClick={openAlertsPage}
                >
                  View all alerts →
                </button>

              )}

            </div>

          )}

        </div>


        {/* =================================
            GUARDIAN
        ================================= */}

        <div className="guardian">

          <div className="guardian-avatar">

            {user.profilePhoto ? (

              <img
                src={user.profilePhoto}
                alt={user.name}
                className="guardian-avatar-image"
              />

            ) : (

              <span className="guardian-avatar-initial">
                {userInitial}
              </span>

            )}

          </div>


          <div>

            <strong>
              {user.name}
            </strong>

            <small>
              {user.role}
            </small>

          </div>


          <span className="arrow">
            ⌄
          </span>

        </div>

      </div>


      {/* =================================
          DATE & TIME
      ================================= */}

      <div className="date-box">

        📅 &nbsp;

        {formattedDate}

        &nbsp; | &nbsp;

        {formattedTime}

      </div>

    </header>

  );

};

export default Navbar;