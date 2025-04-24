import './App.css'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from "./pages/auth/Login/login"
import Home from "./pages/Home/Home"

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        {/* <Route path="/" element={<Landing />} /> */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </HashRouter>
  )
}

export default App
