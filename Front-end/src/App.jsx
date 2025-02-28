import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./pages/Login/Login";

const App = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <div className="app-container">
        {/* <Sidebar /> */}
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
