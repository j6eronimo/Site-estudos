import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Subject from "./pages/Subject";
import Login from "./pages/Login";

const App = () => {
    const [user, setUser] = useState<string | null>(localStorage.getItem("user"));

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login setUser={setUser} />} />
                <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
                <Route path="/subject" element={user ? <Subject user={user} /> : <Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;