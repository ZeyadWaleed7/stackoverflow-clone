import Sidebar from "../../components/Sidebar/Sidebar";
import Rightbar from "../../components/Rightbar/Rightbar";
import styles from "./Profilepage.module.css";
import Profile from "../../components/Profile/Profile";

const Profilepage = () => {
  return (
    <div className={styles["layout"]}>
      <div className={styles["content"]}>
        <Sidebar />
        <main className={styles["main-content"]}>
          <Profile />
        </main>
        <Rightbar />
      </div>
    </div>
  );
};

console.log("Explore Page Rendered");


export default Profilepage;