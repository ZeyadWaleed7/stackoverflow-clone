import "./Tweet.css"
import { MessageCircle, Repeat2, Heart, BarChart3, Bookmark, Share } from "lucide-react"

const TweetPost = () => {
  return (
    <div className="tweet-container">
      <div className="tweet-header">
        <div className="user-info">
          <img src="/placeholder.svg?height=48&width=48" alt="Elon Musk profile" className="profile-image" />
          <div className="user-details">
            <div className="name-container">
              <span className="display-name">Elon Musk</span>
              <span className="verified-badge">
                <svg viewBox="0 0 24 24" aria-label="Verified account" className="verified-icon">
                  <g fill="#1D9BF0">
                    <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path>
                  </g>
                </svg>
              </span>
              <span className="username">@elonmusk</span>
              <span className="dot">·</span>
              <span className="date">Feb 27</span>
            </div>
          </div>
        </div>
        <div className="more-options">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="more-icon">
            <g>
              <path
                d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
                fill="currentColor"
              ></path>
            </g>
          </svg>
        </div>
      </div>

      <div className="tweet-content">
        <p>It is much easier to hide corruption when the system is extremely inefficient.</p>
        <p>However, corruption sticks out like a sore thumb in an efficient system.</p>
      </div>

      <div className="quoted-tweet">
        <div className="quoted-tweet-header">
          <img src="/placeholder.svg?height=20&width=20" alt="Jeff Lutz profile" className="quoted-profile-image" />
          <span className="quoted-display-name">Jeff Lutz</span>
          <span className="quoted-badge green">
            <svg viewBox="0 0 24 24" aria-label="Verified account" className="verified-icon">
              <g fill="#00BA7C">
                <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path>
              </g>
            </svg>
          </span>
          <span className="quoted-badge blue">
            <svg viewBox="0 0 24 24" aria-label="Verified account" className="verified-icon">
              <g fill="#1D9BF0">
                <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path>
              </g>
            </svg>
          </span>
          <span className="quoted-username">@thejefflutz</span>
          <span className="dot">·</span>
          <span className="quoted-date">Feb 27</span>
        </div>

        <div className="quoted-tweet-content">
          <p>
            If Musk's approach to @DOGE is so horrendous why doesn't the opposition start their own DOGE? A better,
            faster, more effective one? Compete!
          </p>
          <p>Opposing congress, senators, & 11,000 media/pundits all with their ...</p>
          <span className="show-more">Show more</span>
        </div>
      </div>

      <div className="tweet-actions">
        <div className="action-button">
          <MessageCircle size={18} />
          <span className="action-count">9.3K</span>
        </div>
        <div className="action-button">
          <Repeat2 size={18} />
          <span className="action-count">19K</span>
        </div>
        <div className="action-button">
          <Heart size={18} />
          <span className="action-count">102K</span>
        </div>
        <div className="action-button">
          <BarChart3 size={18} />
          <span className="action-count">33M</span>
        </div>
        <div className="action-button bookmark">
          <Bookmark size={18} />
        </div>
        <div className="action-button share">
          <Share size={18} />
        </div>
      </div>
    </div>
  )
}

export default TweetPost

