import "./App.css";
import Dashboard from "./pages/dashboard";
import Login from "./pages/auth/LoginPage";
import Register from "./pages/auth/RegisterPage";
import Report from "./pages/report";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import setupAxiosInterceptors from "./services/api";

setupAxiosInterceptors();

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report/:accountId" element={<Report />} />
      </Routes>
    </Router>
  );
}

export default App;
