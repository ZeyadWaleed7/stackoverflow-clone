import "./Sidebar.css";
import { Link } from "react-router-dom";
import { Home, Search, Bell, Mail, Users, User, BadgeCheck,CircleEllipsis } from "lucide-react";
import profile from "../../assets/profile.png";
import logo from "../../assets/twitter-logo.jpg";

const navigationItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Search, label: "Explore", href: "/explore" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: Mail, label: "Messages", href: "/messages" },
  { icon: Users, label: "Communities", href: "/communities" },
  { icon: BadgeCheck, label: "Premium", href: "/premium" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: CircleEllipsis, label: "More", href: "#" }
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo">
              <img src={logo} alt="Twitter Logo" className="twitter-logo" />
            </div>
      <ul className="sidebar-nav">
        {navigationItems.map((item, index) => (
          <li key={index} className="nav-item">
            <Link to={item.href} className="nav-link">
              <item.icon className="nav-icon" />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="profile-section">
        <img 
          src={profile} 
          alt="Profile" 
          className="profile-pic"
        />
        <div className="profile-info">
          <span className="profile-name">Zeyad</span>
          <span className="profile-username">@ZeyadWaleed78</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
