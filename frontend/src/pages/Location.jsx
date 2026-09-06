import Sidebar from "../components/Sidebar";

const Location = () => {
  const latitude = 12.9716;
  const longitude = 77.5946;

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        {/* PAGE TITLE */}

        <div className="location-page-header">
          <div>
            <h1>Location</h1>
            <p>Track the current location of the wearable device</p>
          </div>

          <div className="location-gps-badge">
            <span></span>
            GPS AVAILABLE
          </div>
        </div>


        {/* LOCATION OVERVIEW */}

        <div className="location-overview">

          <div className="location-main-card">

            <div className="location-pin-large">
              📍
            </div>

            <div className="location-main-info">

              <span className="location-label">
                CURRENT LOCATION
              </span>

              <h2>
                Bangalore, Karnataka
              </h2>

              <p>
                Last known location of wearable device
              </p>

            </div>

          </div>


          <div className="location-coordinate-card">

            <div className="coordinate-item">

              <div className="coordinate-icon">
                🌐
              </div>

              <div>
                <span>LATITUDE</span>
                <strong>{latitude}</strong>
              </div>

            </div>


            <div className="coordinate-divider"></div>


            <div className="coordinate-item">

              <div className="coordinate-icon">
                🧭
              </div>

              <div>
                <span>LONGITUDE</span>
                <strong>{longitude}</strong>
              </div>

            </div>

          </div>

        </div>


        {/* MAP */}

        <div className="location-map-card">

          <div className="location-map-header">

            <div>
              <h2>Device Location</h2>
              <p>Last detected GPS position</p>
            </div>

            <div className="map-status">
              <span></span>
              DEVICE ONLINE
            </div>

          </div>


          <div className="location-map">

            <div className="map-grid"></div>

            <div className="map-center">

              <div className="map-pulse">
                <div className="map-location-pin">
                  📍
                </div>
              </div>

              <div className="map-location-label">
                <strong>WS-001</strong>
                <span>Bangalore</span>
              </div>

            </div>

          </div>


          <div className="map-footer">

            <div className="map-coordinate">

              <span>Coordinates</span>

              <strong>
                {latitude}, {longitude}
              </strong>

            </div>


            <button
              className="maps-button"
              onClick={() =>
                window.open(
                  `https://www.google.com/maps?q=${latitude},${longitude}`,
                  "_blank"
                )
              }
            >
              🗺️ Open Google Maps
            </button>

          </div>

        </div>


        {/* LOCATION INFORMATION */}

        <div className="location-bottom-grid">

          <div className="location-detail-card">

            <div className="detail-card-header">
              <h2>Location Information</h2>
            </div>


            <div className="location-detail-row">

              <div>
                <span>Device ID</span>
                <strong>WS-001</strong>
              </div>

              <div className="detail-online">
                ● Online
              </div>

            </div>


            <div className="location-detail-row">

              <div>
                <span>GPS Signal</span>
                <strong>Strong</strong>
              </div>

              <div className="signal-bars">
                ▂ ▅ ▇
              </div>

            </div>


            <div className="location-detail-row">

              <div>
                <span>Location Accuracy</span>
                <strong>High</strong>
              </div>

              <div className="accuracy">
                ± 5 m
              </div>

            </div>


            <div className="location-detail-row">

              <div>
                <span>Last Updated</span>
                <strong>Just now</strong>
              </div>

            </div>

          </div>


          <div className="emergency-location-card">

            <div className="emergency-icon">
              🚨
            </div>

            <div>

              <h2>Emergency Location</h2>

              <p>
                In an emergency, the latest available
                GPS location can be used to locate the
                wearer.
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Location;