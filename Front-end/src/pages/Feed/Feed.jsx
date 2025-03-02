import "./Feed.css"
import Tweet from "../../components/Tweet/Tweet"
import { Image, FileText, BarChart2, Smile, Calendar, MapPin, Sparkles } from "lucide-react"

const TwitterFeed = () => {
  return (
    <div className="feed-container">
      <div className="nav-tabs">
        <button className="tab-button active">For you</button>
        <button className="tab-button">Following</button>
      </div>

      <div className="compose-section">
        <div className="compose-content">
          <img src="/placeholder.svg?height=48&width=48" alt="Profile" className="profile-image" />
          <div className="compose-input-area">
            <input type="text" placeholder="What is happening?!" className="compose-input" />
            <div className="compose-actions">
              <div className="media-actions">
                <button className="media-button">
                  <Image size={20} />
                </button>
                <button className="media-button">
                  <FileText size={20} />
                </button>
                <button className="media-button">
                  <BarChart2 size={20} />
                </button>
                <button className="media-button">
                  <Smile size={20} />
                </button>
                <button className="media-button">
                  <Calendar size={20} />
                </button>
                <button className="media-button">
                  <MapPin size={20} />
                </button>
              </div>
              <div className="post-actions">
                <button className="post-button" disabled>
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="show-posts">
        <span>Show 1,050 posts</span>
      </div>

      <div className="tweet">
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
      </div>
    </div>
  )
}

export default TwitterFeed

