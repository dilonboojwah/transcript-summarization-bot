import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import Summarize from "../pages/Summarize";
import Library from "../pages/Library";
import SummaryDetail from "../pages/SummaryDetail";

const AppRouter: React.FC = () => (
  <Router>
    <Routes>
      {/* Default route and SignIn page */}
      <Route path="/" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      {/* Other routes */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/summarize" element={<Summarize />} />
      <Route path="/library" element={<Library />} />
      {/* Dynamic route for SummaryDetail */}
      <Route path="/summary-detail/:summaryId" element={<SummaryDetail />} />
    </Routes>
  </Router>
);

export default AppRouter;
