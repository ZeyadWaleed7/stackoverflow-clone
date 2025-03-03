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
    { rank: 1, tag: "Trending in Egypt", topic: "#اعلانكم_ترند_𓅓О5592О9593" },
    { rank: 2, tag: "Trending in Egypt", topic: "#المداح", posts: "5,170 posts" },
    { rank: 3, tag: "Trending in Egypt", topic: "#قرات_كم_جزء" },
    { rank: 4, tag: "Only on X · Trending", topic: "رمضان كريم", posts: "232K posts" },
    { rank: 5, tag: "Trending in Egypt", topic: "#صلاه_التراويح_علي_الحياه" },
    { rank: 6, tag: "Trending in Egypt", topic: "#الامه_الاسلاميه" },
    { rank: 7, tag: "Only on X · Trending", topic: "رمضان كريم", posts: "232K posts" },
    { rank: 8, tag: "Trending in Egypt", topic: "#صلاه_التراويح_علي_الحياه" },
    { rank: 9, tag: "Trending in Egypt", topic: "#الامه_الاسلاميه" },
    { rank: 10, tag: "Trending in Egypt", topic: "#المداح", posts: "5,170 posts" },
    { rank: 11, tag: "Trending in Egypt", topic: "#قرات_كم_جزء" },
    { rank: 12, tag: "Only on X · Trending", topic: "رمضان كريم", posts: "232K posts" },
    { rank: 13, tag: "Trending in Egypt", topic: "#صلاه_التراويح_علي_الحياه" },
    { rank: 14, tag: "Trending in Egypt", topic: "#الامه_الاسلاميه" },
    { rank: 15, tag: "Only on X · Trending", topic: "رمضان كريم", posts: "232K posts" },
    { rank: 16, tag: "Trending in Egypt", topic: "#صلاه_التراويح_علي_الحياه" },
  
  
  ]



const Hashtags = () => {
    return (
        <div className="trends-container">
        <h2>Trending in Egypt</h2>
        <TrendList trends={trendsData} />
      </div>
    );
;}

export default Hashtags;