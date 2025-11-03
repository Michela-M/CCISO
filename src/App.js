import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import QuestionPage from "./views/QuestionPage";
import sampleQuestions from "./data/sampleQuestions.json";
import Results from "./views/Results";
import LoadingScreen from "./views/LoadingScreen";
import Login from "./views/Login";
import Signup from "./views/Signup";
import ForgotPassword from "./views/ForgotPassword";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/question"
                    element={<QuestionPage questions={sampleQuestions} />}
                />
                <Route path="/results" element={<Results />} />
                <Route path="/loading" element={<LoadingScreen />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
        </Router>
    );
}

export default App;
