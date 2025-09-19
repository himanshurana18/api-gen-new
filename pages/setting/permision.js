import SettingNav from "../../components/SettingNav";

export default function Permission() {
  return (
    <div className="profile_page">
      <SettingNav currentPage="Permissions" />
      <div className="profile_page_content">
        <div className="profile_header">
          <h1>User Permissions</h1>
          <p>Manage user roles and permissions</p>
        </div>

        <div className="profile_container">
          <div className="permissions_info">
            <h3>Role-Based Access Control</h3>
            <p>The application uses role-based access control to manage user permissions.</p>
            
            <div className="role_list">
              <div className="role_item">
                <h4>Super Admin</h4>
                <p>Full access to all features and settings</p>
              </div>
              
              <div className="role_item">
                <h4>Content Manager</h4>
                <p>Can manage content but has limited access to system settings</p>
              </div>
              
              <div className="role_item">
                <h4>Demo User</h4>
                <p>Read-only access for demonstration purposes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}