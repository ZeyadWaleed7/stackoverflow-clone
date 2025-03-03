import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore/Explore";
import Profile from "./pages/Profilepage/Profilepage";


const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pages/explore" element={<Explore />} /> 
      <Route path="/pages/Profilepage" element={<Profile />} />

    </Routes>
  </Router>
  );
};

export default App;
