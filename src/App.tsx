// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./Pages/About";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import "./Styles/Auth.css";
import "./Styles/Dashboard.css";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/about" element={<About />} />
        <Route path="/" element={<Auth isLogin={false} />} />
        <Route path="/login" element={<Auth isLogin={true} />} />
        <Route path="/buyer" element={<Dashboard userType="buyer" />} />
        <Route path="/seller" element={<Dashboard userType="seller" />} />
      </Routes>
    </Router>
  
  );
};

export default App;



