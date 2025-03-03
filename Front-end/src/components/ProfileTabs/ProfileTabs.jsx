import React, { useState } from "react";
import "./ProfileTabs.css"; // Import the CSS file
import Tweet from "../../components/Tweet/Tweet";

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState("posts");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tab-list" role="tablist">
      <div className="tab-item" role="presentation">
        <button
          role="tab"
          aria-selected={activeTab === "posts"}
          className="tab-link"
          onClick={() => handleTabClick("posts")}
        >
          <div className="tab-content">
            <span className="tab-label">Posts</span>
            <div className={`tab-indicator ${activeTab === "posts" ? "active" : ""}`}></div>
          </div>
        </button>
      </div>
      <div className="tab-item" role="presentation">
        <button
          role="tab"
          aria-selected={activeTab === "replies"}
          className="tab-link"
          onClick={() => handleTabClick("replies")}
        >
          <div className="tab-content">
            <span className="tab-label">Replies</span>
            <div className={`tab-indicator ${activeTab === "replies" ? "active" : ""}`}></div>
          </div>
        </button>
      </div>
      <div className="tab-item" role="presentation">
        <button
          role="tab"
          aria-selected={activeTab === "media"}
          className="tab-link"
          onClick={() => handleTabClick("media")}
        >
          <div className="tab-content">
            <span className="tab-label">Media</span>
            <div className={`tab-indicator ${activeTab === "media" ? "active" : ""}`}></div>
          </div>
        </button>
      </div>
    </div>
  );
};
export default ProfileTabs;
