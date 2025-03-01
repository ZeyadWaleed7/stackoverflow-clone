import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Home /> 
      {/* <Tweet /> */}
        {/* <Signup />
        
         <Routes>
          <Route path="/" element={<Login />} />
        </Routes> */}
    </Router>
  );
};

export default App;
