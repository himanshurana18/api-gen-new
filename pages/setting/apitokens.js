import SettingNav from "../../components/SettingNav";
import { useState } from "react";

export default function ApiTokens() {
  const [activeTab, setActiveTab] = useState('tokens');

  return (
    <div className="profile_page">
      <SettingNav currentPage="API Tokens" />
      <div className="profile_page_content">
        <div className="profile_header">
          <h1>API Tokens & Documentation</h1>
          <p>Manage your API tokens and view documentation</p>
        </div>

        <div className="api_tabs">
          <button 
            className={`tab_button ${activeTab === 'tokens' ? 'active' : ''}`}
            onClick={() => setActiveTab('tokens')}
          >
            API Tokens
          </button>
          <button 
            className={`tab_button ${activeTab === 'docs' ? 'active' : ''}`}
            onClick={() => setActiveTab('docs')}
          >
            Documentation
          </button>
        </div>

        {activeTab === 'tokens' && (
          <div className="profile_container">
            <h2>API Tokens</h2>
            <p>Create and manage your API tokens here.</p>
            <button className="upload-btn">Generate New Token</button>
          </div>
        )}

        {activeTab === 'docs' && (
          <div className="api_guide_section">
            <h2>API Documentation</h2>
            <div className="endpoint_card">
              <h3>Authentication</h3>
              <p>All API requests require authentication using Bearer tokens.</p>
              <pre>Authorization: Bearer YOUR_TOKEN_HERE</pre>
            </div>
            
            <div className="endpoint_card">
              <h3>Base URL</h3>
              <code>{typeof window !== 'undefined' ? window.location.origin : ''}/api/public/</code>
            </div>

            <div className="endpoint_card">
              <h3>Available Endpoints</h3>
              <div className="endpoint_method">
                <span className="method get">GET</span>
                <code>/api/public/[model]</code>
                <p>Retrieve all records from a model</p>
              </div>
              
              <div className="endpoint_method">
                <span className="method post">POST</span>
                <code>/api/public/[model]</code>
                <p>Create a new record</p>
              </div>
              
              <div className="endpoint_method">
                <span className="method put">PUT</span>
                <code>/api/public/[model]/[id]</code>
                <p>Update an existing record</p>
              </div>
              
              <div className="endpoint_method">
                <span className="method delete">DELETE</span>
                <code>/api/public/[model]/[id]</code>
                <p>Delete a record</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}