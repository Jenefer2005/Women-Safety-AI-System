import { useState } from "react";
import Sidebar from "../components/Sidebar";

const Profile = () => {
  const [name, setName] = useState("Jenefer");
  const [email, setEmail] = useState("guardian@example.com");
  const [phone, setPhone] = useState("+91 XXXXX XXXXX");

  const [primaryName, setPrimaryName] = useState("");
  const [primaryPhone, setPrimaryPhone] = useState("");

  const handleSave = () => {
    alert("Profile updated successfully!");
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content">

        {/* HEADER */}
        <div className="profile-header">
          <div>
            <h1>Profile</h1>
            <p>
              Manage your account and emergency contact information
            </p>
          </div>
        </div>

        {/* PROFILE TOP */}
        <div className="profile-top-card">

          <div className="profile-avatar">
            J
          </div>

          <div className="profile-main-info">
            <span>GUARDIAN ACCOUNT</span>
            <h2>{name}</h2>
            <p>Safety monitoring administrator</p>

            <div className="profile-online">
              <span></span>
              Account Active
            </div>
          </div>

        </div>

        {/* PERSONAL INFORMATION */}
        <div className="profile-card">

          <div className="profile-card-header">
            <div className="profile-card-icon">
              👤
            </div>

            <div>
              <h2>Personal Information</h2>
              <p>
                Update your account details
              </p>
            </div>
          </div>

          <div className="profile-form">

            <div className="profile-input-group">
              <label>Full Name</label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />
            </div>

            <div className="profile-input-group">
              <label>Email Address</label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>

            <div className="profile-input-group">
              <label>Phone Number</label>

              <input
                type="text"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
              />
            </div>

            <div className="profile-input-group">
              <label>Role</label>

              <input
                type="text"
                value="Guardian / Administrator"
                disabled
              />
            </div>

          </div>

        </div>

        {/* EMERGENCY CONTACT */}
        <div className="profile-card">

          <div className="profile-card-header">
            <div className="profile-card-icon emergency">
              🚨
            </div>

            <div>
              <h2>Emergency Contact</h2>
              <p>
                Contact notified during emergency situations
              </p>
            </div>
          </div>

          <div className="profile-form">

            <div className="profile-input-group">
              <label>Contact Name</label>

              <input
                type="text"
                placeholder="Enter emergency contact name"
                value={primaryName}
                onChange={(e) =>
                  setPrimaryName(e.target.value)
                }
              />
            </div>

            <div className="profile-input-group">
              <label>Contact Phone</label>

              <input
                type="text"
                placeholder="Enter emergency contact number"
                value={primaryPhone}
                onChange={(e) =>
                  setPrimaryPhone(e.target.value)
                }
              />
            </div>

          </div>

        </div>

       

        {/* SAVE */}
        <button
          className="save-profile-button"
          onClick={handleSave}
        >
          💾 Save Profile
        </button>

      </main>
    </div>
  );
};

export default Profile;