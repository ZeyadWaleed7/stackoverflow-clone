import styles from "./Login.module.css";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import googleIcon from "../../assets/profile.png";

const Login = () => {
  return (
    <div className={styles["container"]}>
      <div className={styles["main-content"]}>
        <div className={styles["logo-section"]}>
          <div className={styles["logo-container"]}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className={styles["x-logo"]}>
              <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </g>
            </svg>
          </div>
        </div>
        <div className={styles["form-section"]}>
          <div className={styles["form-container"]}>
            <h1 className={styles["main-heading"]}>Happening now</h1>
            <h2 className={styles["sub-heading"]}>Join today.</h2>

            <div className={styles["sign-in-options"]}>
              <button className={styles["google-button"]}>
                <div className={styles["google-button-content"]}>
                  <img src={googleIcon} alt="Google" className={styles["profile-image"]} />
                  <span>Sign as Zeyad<br />ZeyadW1@gmail.com</span>
                </div>
              </button>

              <button className={styles["apple-button"]}>
                <div className={styles["button-content"]}>
                  <svg viewBox="0 0 24 24" aria-hidden="true" className={styles["apple-icon"]}>
                    <g>
                      <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"></path>
                    </g>
                  </svg>
                  <span>Sign in with Apple</span>
                </div>
              </button>

              <div className={styles["divider"]}>
                <div className={styles["divider-line"]}></div>
                <span className={styles["divider-text"]}>or</span>
                <div className={styles["divider-line"]}></div>
              </div>

              <button className={styles["create-account-button"]}>
                Create account
              </button>

              <p className={styles["terms-text"]}>
                By signing up, you agree to the 
                <Link to="#" className={styles["terms-link"]}>Terms of Service</Link> and 
                <Link to="#" className={styles["terms-link"]}>Privacy Policy</Link>, including 
                <Link to="#" className={styles["terms-link"]}>Cookie Use</Link>.
              </p>
            </div>

            <div className={styles["signin-section"]}>
              <p className={styles["signin-text"]}>Already have an account?</p>
              <button className={styles["signin-button"]}>
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className={styles["footer"]}>
        <div className={styles["footer-nav"]}>
          <Link to="#" className={styles["footer-link"]}>About</Link>
          <Link to="#" className={styles["footer-link"]}>Help Center</Link>
          <Link to="#" className={styles["footer-link"]}>Terms of Service</Link>
          <Link to="#" className={styles["footer-link"]}>Privacy Policy</Link>
          <Link to="#" className={styles["footer-link"]}>Cookie Policy</Link>
          <Link to="#" className={styles["footer-link"]}>Accessibility</Link>
          <Link to="#" className={styles["footer-link"]}>Ads info</Link>
          <Link to="#" className={styles["footer-link"]}>Blog</Link>
          <Link to="#" className={styles["footer-link"]}>Careers</Link>
          <Link to="#" className={styles["footer-link"]}>Brand Resources</Link>
          <Link to="#" className={styles["footer-link"]}>Marketing</Link>
          <Link to="#" className={styles["footer-link"]}>X for Business</Link>
          <Link to="#" className={styles["footer-link"]}>Developers</Link>
        </div>
        <div>
          <p className={styles["copyright"]}>© 2025 Not Twitter Corp.</p>
        </div>
      </footer>
    </div>
  );
};

export default Login;