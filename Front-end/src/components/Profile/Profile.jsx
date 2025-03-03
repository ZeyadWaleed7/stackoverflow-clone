import "./Profile.css"
import profileBanner from "../../assets/banner.png"; 
import profilePhoto from "../../assets/profile.png"; 
import { ArrowLeft, MoreHorizontal, Search } from "lucide-react"

const Profile = () => {
  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="header-top">
          <button className="back-button">
            <ArrowLeft size={20} />
          </button>
          <div className="header-text">
            <h2>Zeyad Waleed</h2>
            <span className="post-count">1,000 posts</span>
          </div>
        </div>

        <div className="banner-image">
            <img src={profileBanner} alt="Profile banner" className="banner" />
        </div>

        <div className="profile-info-section">
        <div className="profile-photo-container">
            <img src={profilePhoto} alt="Mohamed Salah" className="profile-photo" />
        </div>

          <div className="profile-actions">
            <button className="action-button">
              <MoreHorizontal size={20} />
            </button>
            <button className="action-button">
              <Search size={20} />
            </button>
            <button className="follow-button">Follow</button>
          </div>
        </div>
      </header>

      <div className="profile-info">
        <div className="name-container">
          <h1>Zeyad Waleed</h1>
          <span className="verified-badge">
            <svg viewBox="0 0 24 24" aria-label="Verified account" className="verified-icon">
              <g fill="#1D9BF0">
                <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path>
              </g>
            </svg>
          </span>
        </div>
        <span className="username">@ZeyadWaleed</span>

        <div className="bio">Footballer for Real Madrid</div>

        <div className="profile-metadata">
          <span className="location">
            <svg viewBox="0 0 24 24" className="metadata-icon">
              <g fill="#71767b">
                <path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z"></path>
              </g>
            </svg>
            Cairo, Egypt
          </span>
          <span className="join-date">
            <svg viewBox="0 0 24 24" className="metadata-icon">
              <g fill="#71767b">
                <path d="M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z"></path>
              </g>
            </svg>
            Joined March 2014
          </span>
        </div>

        <div className="follow-stats">
          <span className="stat">
            <span className="stat-value">145</span> Following
          </span>
          <span className="stat">
            <span className="stat-value">19.2M</span> Followers
          </span>
        </div>

      </div>

      <nav className="profile-nav">
        <button className="nav-button active">Posts</button>
        <button className="nav-button">Media</button>
      </nav>
    </div>
  )
}

export default Profile

