import React from "react";
import "./ProfileTweetContent.css";

const TweetContent = () => {
  return (
    <div className="tweet-content">
      <div className="user-info">
        <div className="user-avatar">
          <img
            src="https://pbs.twimg.com/profile_images/1727622705267060736/kEsxC_XB_normal.jpg"
            alt="User Avatar"
          />
        </div>
        <div className="user-details">
          <div className="user-name">عائشة السيد - Aisha AlSayed</div>
          <div className="user-handle">@aishaalsayed9</div>
        </div>
      </div>
      <div className="tweet-text">
        <span>ٌٌramadam kareem</span>
        <a href="/hashtag/رابعة_العدوية?src=hashtag_click">#Ramadan</a>
        <span> ... </span>
      </div>
      <div className="tweet-media">
        <img
          src="https://pbs.twimg.com/media/F3bInBpWwAEmg31?format=jpg&name=small"
          alt="Tweet Media"
        />
      </div>
    </div>
  );
};

export default TweetContent;
