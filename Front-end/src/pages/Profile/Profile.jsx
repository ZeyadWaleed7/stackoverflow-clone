import Sidebar from "../../components/Sidebar/Sidebar";
import Rightbar from "../../components/Rightbar/Rightbar";
import ProfileName from "../../components/ProfileName/ProfileName";
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo";
import ProfileTabs from "../../components/ProfileTabs/ProfileTabs";
import TweetContainer from "../../components/ProfileTweetContainer/ProfileTweetContainer";


import "./Profile.css";

const Profile = () => {
  return (
    <div className="layout">
      <div className="content">
        <Sidebar />
        <main className="main-content">
        <ProfileName/>
        <ProfileInfo/>
        <ProfileTabs/>
        <TweetContainer/>
        </main>
        <Rightbar />
      </div>
    </div>
  );
};
console.log("Explore Page Rendered");


export default Profile;