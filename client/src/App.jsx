import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Landing from "./landing/Landing";
import StudentDashboard from "./dashboards/StudentDashboard";
import TeacherDashboard from "./dashboards/TeacherDashboard";
import AdminDashboard from "./dashboards/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      {" "}
      <Routes>
        {" "}
        <Route path="/" element={<Landing />} />{" "}
        <Route path="/student" element={<StudentDashboard />} />{" "}
        <Route path="/teacher" element={<TeacherDashboard />} />{" "}
        <Route path="/admin" element={<AdminDashboard />} />{" "}
      </Routes>{" "}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#6d28d9",
            color: "#ffffff",
            fontWeight: 600,
            borderRadius: "12px",
            padding: "12px 18px",
            fontSize: "14px",
          },
          iconTheme: {
            primary: "#6d28d9",
            secondary: "#ffffff",
          },
        }}
      />
    </BrowserRouter>
  );
}
export default App;
