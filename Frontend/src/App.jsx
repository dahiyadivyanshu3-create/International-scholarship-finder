import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import DashboardLayout from "./components/DashboardLayout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Details from "./pages/Details";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Applications from "./pages/Applications";

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

const ComingSoon = ({ name }) => <p className="text-slate-500">{name}</p>;

export default function App() {
  return (
    <Routes>
    
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/scholarship/:id" element={<Details />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<DashboardLayout />}>
      <Route path="/applications" element={<Applications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ComingSoon name="Profile" />} />
        <Route path="/saved" element={<ComingSoon name="Saved" />} />
        <Route path="/applications" element={<ComingSoon name="Applications" />} />
        <Route path="/notifications" element={<ComingSoon name="Notifications" />} />
      </Route>
    </Routes>
  );
}