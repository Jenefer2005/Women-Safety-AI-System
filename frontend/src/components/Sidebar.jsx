import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="logo">
        <div className="logo-icon">🛡️</div>

        <div>
          <h2>WOMEN SAFETY AI</h2>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">

        <NavLink to="/dashboard">
          📊 <span>Dashboard</span>
        </NavLink>

        
        <NavLink to="/alerts">
          🔔 <span>Alerts</span>
        </NavLink>

        <NavLink to="/location">
          📍 <span>Location</span>
        </NavLink>

        <NavLink to="/history">
          📅 <span>History</span>
        </NavLink>

        <NavLink to="/device">
          📱 <span>Device</span>
        </NavLink>

        <NavLink to="/settings">
          ⚙️ <span>Settings</span>
        </NavLink>

        <NavLink to="/profile">
          👤 <span>Profile</span>
        </NavLink>

      </nav>

      {/* Logout */}
      <button
        className="logout-btn"
        onClick={() => {
        localStorage.clear();
        window.location.href = "/login";
        }}
      >
     🚪 <span>Logout</span>
     </button>

      {/* Device Information */}
      <div className="device-box">

        <p>Device ID</p>

        <h3>WS-001</h3>

        <div className="connection-status">
          <span className="status-dot"></span>
          Connected
        </div>

        <small>Last updated: Just now</small>

      </div>

    </aside>
  );
};

export default Sidebar;