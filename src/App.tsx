import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Subject from "./pages/Subject";
import Login from "./pages/Login";

const App = () => {
    const isAuthenticated = localStorage.getItem("user") !== null;

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
                <Route path="/subject" element={isAuthenticated ? <Subject /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;
