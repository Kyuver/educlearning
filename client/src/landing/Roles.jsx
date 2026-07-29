import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, Settings2 } from "lucide-react";
function Roles() {
  return (
    <section id="roles" className="roles">
      {" "}
      <div className="wrap">
        {" "}
        <div className="section-head">
          {" "}
          <span className="eyebrow">Choose a Role</span>{" "}
          <h2>Pick a seat.</h2>{" "}
        </div>{" "}
        <div className="role-grid">
          {" "}
          <div className="role-card student">
            {" "}
            <span className="role-seat">SEAT A</span>{" "}
            <div className="role-icon">
              <GraduationCap size={22} />
            </div>{" "}
            <h3>Student</h3> <div className="role-divider"></div>{" "}
            <ul className="role-features">
              {" "}
              <li>Access learning dashboard & subjects</li>{" "}
              <li>Browse lessons & study materials</li>{" "}
              <li>Take quizzes & track practice progress</li>{" "}
            </ul>{" "}
            <Link to="/student" className="btn btn-gold">
              Log in as Student
            </Link>{" "}
          </div>{" "}
          <div className="role-card teacher">
            {" "}
            <span className="role-seat">SEAT B</span>{" "}
            <div className="role-icon">
              <BookOpen size={22} />
            </div>{" "}
            <h3>Teacher</h3> <div className="role-divider"></div>{" "}
            <ul className="role-features">
              {" "}
              <li>Manage subject modules & class content</li>{" "}
              <li>Create & edit lesson materials</li>{" "}
              <li>Track student progress & assignments</li>{" "}
            </ul>{" "}
            <Link to="/teacher" className="btn btn-light-outline">
              Log in as Teacher
            </Link>{" "}
          </div>{" "}
          <div className="role-card admin">
            {" "}
            <span className="role-seat">SEAT C</span>{" "}
            <div className="role-icon">
              <Settings2 size={22} />
            </div>{" "}
            <h3>Admin</h3> <div className="role-divider"></div>{" "}
            <ul className="role-features">
              {" "}
              <li>Manage students, teachers & subject listings</li>{" "}
              <li>Approve / delete controls</li>{" "}
              <li>Visual overview of the platform</li>{" "}
            </ul>{" "}
            <Link to="/admin" className="btn btn-light-outline">
              Log in as Admin
            </Link>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
export default Roles;