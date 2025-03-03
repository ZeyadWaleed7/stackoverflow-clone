import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore/Explore";
import Profile from "./pages/Profile/Profile";


const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Profile />} />
      {/* <Route path="/pages/explore" element={<Explore />} /> 
      <Route path="/pages/profile" element={<Profile />} />  */}

    </Routes>
  </Router>
  );
};

export default App;
