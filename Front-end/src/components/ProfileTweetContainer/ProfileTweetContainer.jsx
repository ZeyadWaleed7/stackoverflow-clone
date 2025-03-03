import React from "react";
import TweetHeader from "../ProfileTweetHeader/ProfileTweetHeader";
import TweetContent from "../ProfileTweetContent/ProfileTweetContent";
import TweetActions from "../ProfileTweetActions/ProfileTweetActions";
import "./ProfileTweetContainer.css";

const TweetContainer = () => {
  return (
    <div className="tweet-container" data-testid="cellInnerDiv">
      <TweetHeader />
      <TweetContent />
      <TweetActions />
    </div>
  );
};

export default TweetContainer;
