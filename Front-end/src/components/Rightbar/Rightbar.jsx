import React from 'react';
import { Link } from "react-router-dom";
import "./Rightbar.css";

const TrendingItem = ({ tag, topic, posts }) => {
  return (
    <div className="trending-item">
      <span className="trending-tag">{tag}</span>
      <span className="trending-topic">{topic}</span>
      <span className="trending-posts">{posts}</span>
    </div>
  );
};

const FollowItem = ({ name, username }) => {
  return (
    <div className="follow-item">
      <div className="follow-info">
        <span className="follow-name">{name}</span>
        <span className="follow-username">{username}</span>
      </div>
      <button className="follow-button">Follow</button>
    </div>
  );
};

const RightSidebar = () => {
  // Trending data
  const trendingData = [
    { tag: "Trending in Egypt", topic: "#UzakSehir", posts: "31.5K posts" },
    { tag: "Only on X", topic: "#Tending", posts: "48.3K posts" },
    { tag: "Only on X", topic: "#Tending", posts: "48.3K posts" },
  ];

  const followData = [
    { name: "mohamed mansour", username: "@engmam84" },
    { name: "zeyad walled", username: "@mohy77" },
    { name: "mohy eldeen", username: "@zezo84" },
  ];

  return (
    <div className="right-sidebar">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
        />
      </div>

      <div className="premium-box">
        <h3>Subscribe to Premium</h3>
        <p>Subscribe to unlock new features and if eligible, receive a share of revenue.</p>
        <button className="subscribe-button">Subscribe</button>
      </div>

      <div className="trending-box">
        <h3>What’s happening</h3>
        {trendingData.map((item, index) => (
          <TrendingItem
            key={index}
            tag={item.tag}
            topic={item.topic}
            posts={item.posts}
          />
        ))}
        <button className="show-more-button">Show more</button>
      </div>

      <div className="follow-box">
        <h3>Who to follow</h3>
        {followData.map((item, index) => (
          <FollowItem
            key={index}
            name={item.name}
            username={item.username}
          />
        ))}
        <button className="show-more-button">Show more</button>
      </div>
    </div>
  );
};

export default RightSidebar;