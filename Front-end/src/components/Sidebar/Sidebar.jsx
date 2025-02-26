import "./Sidebar.css";
import { Link } from "react-router-dom";
import { Home, Search, Bell, Mail, List, Bookmark, Users, Star, User, MoreHorizontal } from "lucide-react";

const navigationItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Search, label: "Explore", href: "/explore" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: Mail, label: "Messages", href: "/messages" },
  { icon: Bookmark, label: "Bookmarks", href: "/bookmarks" },
  { icon: Users, label: "Communities", href: "/communities" },
  { icon: Star, label: "Premium", href: "/premium" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: MoreHorizontal, label: "More", href: "#" }
];

const Sidebar = () => {
  return (
    <aside className="sidebar">
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
    </aside>
  );
};

export default Sidebar;
