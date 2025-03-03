import styles from "./Tweet.module.css";
import { MessageCircle, Repeat2, Heart, BarChart3, Bookmark, Share } from "lucide-react"

const TweetPost = () => {
  return (
    <div className={styles["tweet-container"]}>
      <div className={styles["tweet-header"]}>
        <div className={styles["user-info"]}>
          <img src="/placeholder.svg?height=48&width=48" alt="profile" className={styles["profile-image"]} />
          <div className={styles["user-details"]}>
            <div className={styles["name-container"]}>
              <span className={styles["display-name"]}>Zeyad</span>
              <span className={styles["verified-badge"]}>
                <svg viewBox="0 0 24 24" aria-label="Verified account" className={styles["verified-icon"]}>
                  <g fill="#1D9BF0">
                    <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"></path>
                  </g>
                </svg>
              </span>
              <span className={styles["username"]}>@ZeyadWaleed7</span>
              <span className={styles["dot"]}>·</span>
              <span className={styles["date"]}>Oct 20</span>
            </div>
            <div className={styles["tweet-content"]}>
              <p>Ramadan kareem</p>
            </div>
            <div className={styles["quoted-tweet"]}></div>
          </div>
        </div>
        <div className={styles["more-options"]}>
          <svg viewBox="0 0 24 24" aria-hidden="true" className={styles["more-icon"]}>
            <g>
              <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" fill="currentColor"></path>
            </g>
          </svg>
        </div>
      </div>
      <div className={styles["tweet-footer"]}>
        <div className={styles["tweet-actions"]}>
          <div className={styles["action-button"]}>
            <MessageCircle size={18} />
            <span className={styles["action-count"]}>9.3K</span>
          </div>
          <div className={styles["repost-action-button"]}>
            <Repeat2 size={18} />
            <span className={styles["action-count"]}>19K</span>
          </div>
          <div className={styles["like-action-button"]}>
            <Heart size={18} />
            <span className={styles["action-count"]}>102K</span>
          </div>
          <div className={styles["action-button"]}>
            <BarChart3 size={18} />
            <span className={styles["action-count"]}>33M</span>
          </div>
        </div>    
        <div className={styles["share-bookmark"]}>
          <div className={`${styles["action-button"]} ${styles["bookmark"]}`}>
            <Bookmark size={18} />
          </div>
          <div className={`${styles["action-button"]} ${styles["share"]}`}>
            <Share size={18} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TweetPost