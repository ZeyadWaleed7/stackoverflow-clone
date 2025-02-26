import "./Navbar.css";
import logo from "../../assets/twitter-logo.jpg";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Twitter Logo" className="twitter-logo" />
      </div>
    </nav>
  );
};

export default Navbar;