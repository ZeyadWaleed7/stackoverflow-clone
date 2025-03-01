import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Rightbar from "../components/Rightbar/Rightbar";
import ExploreHead from "../components/ExploreHead/ExploreHead";


const Home = () => {
  return (
    <div>
      <Navbar  />
      <Sidebar />
      <Rightbar/>
      <ExploreHead/>
    </div>
  );
};

export default Home;