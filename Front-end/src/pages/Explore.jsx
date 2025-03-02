import Sidebar from "../components/Sidebar/Sidebar";
import Rightbar from "../components/Rightbar/Rightbar";
import ExploreHead from "../pages/ExploreHead/ExploreHead";
import Hashtags from "../pages/Hashtags/Hashtags";


const Explore = () => {
  return (
    <div className="layout">
      <div className="content">
        <Sidebar />
        <main className="main-content">
          <ExploreHead />
          <Hashtags/>
        </main>
        <Rightbar />
      </div>
    </div>
  );
};

export default Explore;