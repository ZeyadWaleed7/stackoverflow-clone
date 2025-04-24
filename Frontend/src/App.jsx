import './App.css'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Landing from "./pages/Login"
import Home from "./pages/Home"

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </HashRouter>
  )
}

export default App
