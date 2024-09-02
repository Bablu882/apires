import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import DashEmployee from "../components/DashEmployee";
import DashHome from "../components/DashHome";
import Header from "../components/Header";
import AutoLogout from "../components/AutoLogout";
import CreateEmployee from "../components/CreateEmployee";
import ViewEmpWork from "../components/ViewEmpWork";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);


  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    // Perform any additional logout logic here, like clearing user data
    navigate('/login'); // Redirect to the login page
  }, [navigate]);

  AutoLogout(900000, handleLogout);


  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div style={{width:'16%'}}>
        <AdminSidebar />
      </div>
      <div className="bg-[#f9f9fa]" style={{width:'84%', marginLeft:'14px'}}>
        <Header />
        {tab === "home" && <DashHome />}
        {tab === "employee" && <DashEmployee />}
        {tab === "createemployee" && <CreateEmployee />}
        {tab === "viewempwork" && <ViewEmpWork />}
      </div>
    </div>
  );
};

export default Dashboard;
