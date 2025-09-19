import SettingNav from "../../components/SettingNav";

export default function EnvData() {
  return (
    <div className="profile_page">
      <SettingNav currentPage="Environment Variables" />
      <div className="profile_page_content">
        <div className="profile_header">
          <h1>Environment Variables</h1>
          <p>Manage your application environment variables</p>
        </div>

        <div className="profile_container">
          <div className="env_warning">
            <h3>⚠️ Security Notice</h3>
            <p>Environment variables may contain sensitive information. Only authorized users should access this section.</p>
          </div>
          
          <div className="env_list">
            <h3>Current Environment</h3>
            <p>Environment: {process.env.NODE_ENV || 'development'}</p>
            <p>For security reasons, environment variables are not displayed in the UI.</p>
          </div>
        </div>
      </div>
    </div>
  );
}