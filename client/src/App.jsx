import { BrowserRouter, Routes, Route } from "react-router-dom";
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
    </BrowserRouter>
  );
}
export default App;
