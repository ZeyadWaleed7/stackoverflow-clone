import React from 'react';
import { Link } from "react-router-dom";
import "./Rightbar.css";
import profile from "../../assets/profile.png";

const TrendingItem = ({ tag, topic, posts }) => {
  return (
    <div className="trending-item">
      <div className="trending-left">
        <span className="trending-tag">{tag}</span>
        <span className="trending-posts">{posts}</span>
      </div>
      <div className="trending-right">
        <span className="trending-topic">{topic}</span>
      </div>
    </div>
  );
};

const FollowItem = ({ name, username, profileImage }) => {
  return (
    <div className="follow-item">
      <div className="follow-left">
        <img src={profileImage} alt={name} className="follow-profile-pic" />
        <div className="follow-info">
          <span className="follow-name">{name}</span>
          <span className="follow-username">{username}</span>
        </div>
      </div>
      <button className="follow-button">Follow</button>
    </div>
  );
};

const RightSidebar = () => {
  const trendingData = [
    { tag: "Trending in Egypt", topic: "#UzakSehir", posts: "31.5K posts" },
    { tag: "Only on X", topic: "#Tending", posts: "48.3K posts" },
    { tag: "Only on X", topic: "#Tending", posts: "48.3K posts" },
  ];

  const followData = [
    { 
      name: "Zeyad Waleed", 
      username: "@ZeyadWaleed",
      profileImage: profile
    },
    { 
      name: "Mohy Eldeen", 
      username: "@Mohyyy",
      profileImage: profile 
    },
  ];

  return (
    <div className="right-sidebar">
      <div className="trending-box">
        <p className="title">What’s happening</p>
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
      <p className="title">Who to follow</p>
        {followData.map((item, index) => (
          <FollowItem
            key={index}
            name={item.name}
            username={item.username}
            profileImage={item.profileImage}
          />
        ))}
        <button className="show-more-button">Show more</button>
      </div>
    </div>
  );
};

export default RightSidebar;