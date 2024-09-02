import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AddWork from "./components/AddWork";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from"./pages/AdminDasboard";
import EditWork from "./components/EditWork";
import CreateEmployee from "./components/CreateEmployee";
import ViewEmpWork from "./components/ViewEmpWork";
import EditEmployee from "./components/EditEmployee";
import AddProduct from "./components/AddProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/dashboard/DashWork/AddWork" element={<AddWork/>} />
        <Route path="/dashboard/DashWork/EditWork/:id" element={<EditWork/>} />
        <Route path="/admindashboard/DashEmployee/CreateEmployee" element={<CreateEmployee/>} />
        <Route path="/admindashboard/DashEmployee/ViewEmpWork" element={<ViewEmpWork/>} />
        <Route path="/admindashboard/DashEmployee/EditEmployee" element={<EditEmployee/>} />
        <Route path="/dashboard/AddProduct" element={<AddProduct/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
