import "./App.css";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

function App() {
  const [user, setLoginUser] = useState({});

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login setLoginUser={setLoginUser} />} />
          <Route path="/" element={user && user._id ? <HomePage /> : <Navigate to="/Register" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
