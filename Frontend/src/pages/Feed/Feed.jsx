import styles from "./Feed.module.css";
import Tweet from "../../components/Tweet/Tweet";
import { Image, FileText, BarChart2, Smile, Calendar, MapPin, Sparkles } from "lucide-react";

const TwitterFeed = () => {
  return (
    <div className={styles["feed-container"]}>
      <div className={styles["nav-tabs"]}>
        <button className={`${styles["tab-button"]} ${styles["active"]}`}>For you</button>
        <button className={styles["tab-button"]}>Following</button>
      </div>

      <div className={styles["compose-section"]}>
        <div className={styles["compose-content"]}>
          <img src="/placeholder.svg?height=48&width=48" alt="Profile" className={styles["profile-image"]} />
          <div className={styles["compose-input-area"]}>
            <input type="text" placeholder="What is happening?!" className={styles["compose-input"]} />
            <div className={styles["compose-actions"]}>
              <div className={styles["media-actions"]}>
                <button className={styles["media-button"]}>
                  <Image size={20} />
                </button>
                <button className={styles["media-button"]}>
                  <FileText size={20} />
                </button>
                <button className={styles["media-button"]}>
                  <BarChart2 size={20} />
                </button>
                <button className={styles["media-button"]}>
                  <Smile size={20} />
                </button>
                <button className={styles["media-button"]}>
                  <Calendar size={20} />
                </button>
                <button className={styles["media-button"]}>
                  <MapPin size={20} />
                </button>
              </div>
              <div className={styles["post-actions"]}>
                <button className={styles["post-button"]} disabled>
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles["show-posts"]}>
        <span>Show 1,050 posts</span>
      </div>

      <div className={styles["tweet"]}>
        <Tweet />
        <Tweet />
        <Tweet />
        <Tweet />
      </div>
    </div>
  )
}

export default TwitterFeed