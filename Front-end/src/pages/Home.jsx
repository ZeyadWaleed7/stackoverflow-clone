import Sidebar from "../components/Sidebar/Sidebar";
import Rightbar from "../components/Rightbar/Rightbar";
import Feed from "../pages/Feed/Feed";

const Home = () => {
  return (
    <div className="layout">
      <div className="content">
        <Sidebar />
        <main className="main-content">
          <Feed />
        </main>
        <Rightbar />
      </div>
    </div>
  );
};

export default Home;