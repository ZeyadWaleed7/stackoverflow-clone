import React from 'react';
import { Link } from "react-router-dom";
import "./Hashtags.css";

const TrendItem = ({ rank, tag, topic, posts }) => {
    return (
      <div className="trend-item" role="link" tabIndex="0">
        <div className="trend-info">
          <div className="trend-rank">
            <span>{rank}</span>
            <span>·</span>
          </div>
          <div className="trend-tag">{tag}</div>
        </div>
        <div className="trend-topic">{topic}</div>
        {posts && <div className="trend-posts">{posts}</div>}
        <div className="trend-actions">
          <button aria-label="More" role="button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
            </svg>
          </button>
        </div>
      </div>
    );
  };
  
const TrendList = ({ trends }) => {
   return (
      <div className="trend-list">
        {trends.map((trend, index) => (
          <TrendItem
            key={index}
            rank={trend.rank}
            tag={trend.tag}
            topic={trend.topic}
            posts={trend.posts}
          />
        ))}
      </div>
    );
  };
  

  const trendsData = [
    { rank: 1, tag: "Trending in Sports", topic: "#UCL", posts: "2.1M posts" },
    { rank: 2, tag: "Trending Worldwide", topic: "#RealMadrid", posts: "1.5M posts" },
    { rank: 3, tag: "Entertainment", topic: "#Oscars2024", posts: "1.2M posts" },
    { rank: 4, tag: "Technology · Trending", topic: "Artificial Intelligence", posts: "892K posts" },
    { rank: 5, tag: "Trending in Business", topic: "#Bitcoin", posts: "1.2M posts" },
    { rank: 6, tag: "Sports · Trending", topic: "#PremierLeague", posts: "1.2M posts" },
    { rank: 7, tag: "Gaming · Trending", topic: "#GTA6", posts: "500K posts" },
    { rank: 8, tag: "Technology", topic: "#iOS18", posts: "1.2M posts" },
    { rank: 9, tag: "Entertainment", topic: "#SpotifyWrapped", posts: "1.2M posts" },
    { rank: 10, tag: "Trending in Sports", topic: "#NBA", posts: "450K posts" },
    { rank: 11, tag: "Technology", topic: "#iPhone16", posts: "1.2M posts" },
    { rank: 12, tag: "Entertainment · Trending", topic: "Netflix", posts: "332K posts" },
    { rank: 13, tag: "Trending in Gaming", topic: "#Fortnite", posts: "1.2M posts" },
    { rank: 14, tag: "Business · Trending", topic: "#TeslaStock", posts: "1.2M posts" },
    { rank: 15, tag: "Music · Trending", topic: "Taylor Swift", posts: "1.2M posts" },
    { rank: 16, tag: "Technology", topic: "#MacbookPro", posts: "1.2M posts"}
];



const Hashtags = () => {
    return (
        <div className="trends-container">
        <TrendList trends={trendsData} />
      </div>
    );
;}

export default Hashtags;