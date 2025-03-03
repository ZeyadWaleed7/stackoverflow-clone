import React from "react";
import "./ProfileInfo.css"; // Import the CSS file

const ProfileHeader = () => {
  return (
    <div className="profile-header-container">
      {/* Header Banner */}
      <a href="/aishaalsayed9/header_photo" className="header-banner-link">
        <div className="header-banner">
          <div
            className="banner-image"
            style={{
              backgroundImage:
                "url('https://pbs.twimg.com/profile_banners/1464555706376458245/1679394273/600x200')",
            }}
          ></div>
          <img
            alt=""
            draggable="true"
            src="https://pbs.twimg.com/profile_banners/1464555706376458245/1679394273/600x200"
            className="banner-img"
          />
        </div>
      </a>

      {/* Profile Info */}
      <div className="profile-info">
        <div className="avatar-container">
          <div className="avatar">
            <a href="/aishaalsayed9/photo" className="avatar-link">
              <div
                className="avatar-image"
                style={{
                  backgroundImage:
                    "url('https://pbs.twimg.com/profile_images/1727622705267060736/kEsxC_XB_200x200.jpg')",
                }}
              ></div>
              <img
                alt="Opens profile photo"
                draggable="true"
                src="https://pbs.twimg.com/profile_images/1727622705267060736/kEsxC_XB_200x200.jpg"
                className="avatar-img"
              />
            </a>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button aria-label="More" className="action-button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
              </g>
            </svg>
            More
          </button>
          <button aria-label="Profile Summary" className="action-button">
            <svg viewBox="0 0 33 32" aria-hidden="true">
              <g>
                <path d="M12.745 20.54l10.97-8.19c.539-.4 1.307-.244 1.564.38 1.349 3.288.746 7.241-1.938 9.955-2.683 2.714-6.417 3.31-9.83 1.954l-3.728 1.745c5.347 3.697 11.84 2.782 15.898-1.324 3.219-3.255 4.216-7.692 3.284-11.693l.008.009c-1.351-5.878.332-8.227 3.782-13.031L33 0l-4.54 4.59v-.014L12.743 20.544M10.48 22.531c-3.837-3.707-3.175-9.446.1-12.755 2.42-2.449 6.388-3.448 9.852-1.979l3.72-1.737c-.67-.49-1.53-1.017-2.515-1.387-4.455-1.854-9.789-.931-13.41 2.728-3.483 3.523-4.579 8.94-2.697 13.561 1.405 3.454-.899 5.898-3.22 8.364C1.49 30.2.666 31.074 0 32l10.478-9.466"></path>
              </g>
            </svg>
            Profile
          </button>
          <button aria-label="Search" className="action-button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
              </g>
            </svg>
            Search
          </button>
          <button aria-label="Message" className="action-button">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path>
              </g>
            </svg>
            Message
          </button>
          <button aria-label="Follow @aishaalsayed9" className="follow-button">
            Follow
          </button>
        </div>

        {/* User Details */}
        <div className="user-details">
          <h2 className="user-name">
            Mohysaleh
            <span className="verified-badge">
              <svg viewBox="0 0 22 22" aria-label="Verified account" role="img">
                <g>
                  <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path>
                </g>
              </svg>
            </span>
          </h2>
          <div className="username">@aishaalsayed9</div>
          <div className="bio">
            محاميحو
          </div>
          <button className="translate-bio">Translate bio</button>
        </div>

        {/* Additional Info */}
        <div className="additional-info">
          <span className="info-item">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path d="M19.5 6H17V4.5C17 3.12 15.88 2 14.5 2h-5C8.12 2 7 3.12 7 4.5V6H4.5C3.12 6 2 7.12 2 8.5v10C2 19.88 3.12 21 4.5 21h15c1.38 0 2.5-1.12 2.5-2.5v-10C22 7.12 20.88 6 19.5 6zM9 4.5c0-.28.23-.5.5-.5h5c.28 0 .5.22.5.5V6H9V4.5zm11 14c0 .28-.22.5-.5.5h-15c-.27 0-.5-.22-.5-.5v-3.04c.59.35 1.27.54 2 .54h5v1h2v-1h5c.73 0 1.41-.19 2-.54v3.04zm0-6.49c0 1.1-.9 1.99-2 1.99h-5v-1h-2v1H6c-1.1 0-2-.9-2-2V8.5c0-.28.23-.5.5-.5h15c.28 0 .5.22.5.5v3.51z"></path>
              </g>
            </svg>
            Journalist
          </span>
          <span className="info-item">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z"></path>
              </g>
            </svg>
Egypt          </span>
          <span className="info-item">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path d="M8 10c0-2.21 1.79-4 4-4v2c-1.1 0-2 .9-2 2H8zm12 1c0 4.27-2.69 8.01-6.44 8.83L15 22H9l1.45-2.17C6.7 19.01 4 15.27 4 11c0-4.84 3.46-9 8-9s8 4.16 8 9zm-8 7c3.19 0 6-3 6-7s-2.81-7-6-7-6 3-6 7 2.81 7 6 7z"></path>
              </g>
            </svg>
            Born June 9
          </span>
          <span className="info-item">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <g>
                <path d="M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z"></path>
              </g>
            </svg>
            Joined November 2021
          </span>
        </div>

        {/* Followers and Following */}
        <div className="follow-stats">
          <a href="/aishaalsayed9/following" className="follow-link">
            <span className="count">217</span> Following
          </a>
          <a href="/aishaalsayed9/verified_followers" className="follow-link">
            <span className="count">232.9K</span> Followers
          </a>
        </div>

        {/* Not Followed Message */}
        <div className="not-followed-message">
          Not followed by anyone you’re following
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
