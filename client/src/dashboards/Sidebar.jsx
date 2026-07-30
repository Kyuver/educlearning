import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
          <motion.span
            className="dsb-chevron"
            animate={{ rotate: coursesOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {" "}
            ▸{" "}
          </motion.span>{" "}
        </div>{" "}
        <AnimatePresence initial={false}>
          {" "}
          {coursesOpen && (
            <motion.ul
              className="dsb-subject-list"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
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
            </motion.ul>
          )}{" "}
        </AnimatePresence>{" "}
      </nav>{" "}
    </aside>
  );
}
export default Sidebar;