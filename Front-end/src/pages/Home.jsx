import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Rightbar from "../components/Rightbar/Rightbar";

const Home = () => {
  return (
    <div className="layout">
      <Navbar />
      <div className="content">
        <Sidebar />
        <main className="main-content">
        </main>
        <Rightbar />
      </div>
    </div>
  );
};

export default Home;