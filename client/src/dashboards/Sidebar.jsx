import { useState } from "react";
function Sidebar({ subjects, selectedSubjectId, onSelectSubject, topItem }) {
  const [coursesOpen, setCoursesOpen] = useState(true);
  return (
    <aside className="dsb-sidebar">
      {" "}
      <div className="dsb-brand">🎓 KlikAral</div>{" "}
      <nav>
        {" "}
        {topItem}{" "}
        <div
          className="dsb-nav-item dsb-toggle"
          onClick={() => setCoursesOpen(!coursesOpen)}
        >
          {" "}
          <span>📚</span> Courses{" "}
          <span className="dsb-chevron">{coursesOpen ? "▾" : "▸"}</span>{" "}
        </div>{" "}
        {coursesOpen && (
          <ul className="dsb-subject-list">
            {" "}
            {subjects.map((s) => (
              <li
                key={s.id}
                className={selectedSubjectId === s.id ? "active" : ""}
                onClick={() => onSelectSubject(s.id)}
              >
                {" "}
                {s.name}{" "}
              </li>
            ))}{" "}
          </ul>
        )}{" "}
      </nav>{" "}
    </aside>
  );
}
export default Sidebar;