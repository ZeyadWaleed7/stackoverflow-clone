import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup/Signup";
import Tweet from "./components/Tweet/Tweet";

const App = () => {
  return (
    <Router>
      <Tweet />
        {/* <Signup />
        <Home /> 
         <Routes>
          <Route path="/" element={<Login />} />
        </Routes> */}
    </Router>
  );
};

export default App;
