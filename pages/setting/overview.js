import SettingNav from "../../components/SettingNav";

export default function Overview() {
  return (
    <div className="profile_page">
      <SettingNav currentPage="Overview" />
      <div className="profile_page_content">
        <div className="profile_header">
          <h1>System Overview</h1>
          <p>General information about your application</p>
        </div>

        <div className="profile_container">
          <div className="overview_stats">
            <div className="stat_card">
              <h3>Application Status</h3>
              <p>Running</p>
            </div>
            <div className="stat_card">
              <h3>Environment</h3>
              <p>{process.env.NODE_ENV || 'development'}</p>
            </div>
            <div className="stat_card">
              <h3>Version</h3>
              <p>1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}