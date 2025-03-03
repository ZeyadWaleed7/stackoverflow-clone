import Sidebar from "../../components/Sidebar/Sidebar";
import Rightbar from "../../components/Rightbar/Rightbar";
import Feed from "../Feed/Feed";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles["layout"]}>
      <div className={styles["content"]}>
        <Sidebar />
        <main className={styles["main-content"]}>
          <Feed />
        </main>
        <Rightbar />
      </div>
    </div>
  );
};

export default Home;