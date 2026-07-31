import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, LogOut } from "lucide-react";

function Sidebar({ subjects, selectedSubjectId, onSelectSubject, topItem }) {
  const [coursesOpen, setCoursesOpen] = useState(true);
  return (
    <aside className="w-64 h-screen sticky top-0 bg-ink text-white flex flex-col shrink-0">
      <div className="px-6 py-5 text-lg font-bold text-gold">KlikAral</div>
      <nav className="flex-1 overflow-y-auto">
        {topItem}
        <div
          className="flex items-center gap-2.5 px-5 py-3 text-sm cursor-pointer border-l-3 border-transparent hover:bg-white/6"
          onClick={() => setCoursesOpen(!coursesOpen)}
        >
          <span>📚</span> Courses
          <motion.span
            className="ml-auto"
            animate={{ rotate: coursesOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight size={14} />
          </motion.span>
        </div>
        <AnimatePresence initial={false}>
          {coursesOpen && (
            <motion.ul
              className="text-white/85"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              {subjects.map((s) => (
                <li
                  key={s.id}
                  className={
                    "px-5 py-2.5 pl-10 text-sm cursor-pointer " +
                    (selectedSubjectId === s.id
                      ? "bg-white/14 text-white border-l-3 border-gold"
                      : "border-l-3 border-transparent hover:bg-white/6")
                  }
                  onClick={() => onSelectSubject(s.id)}
                >
                  {s.name}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
      <div className="px-5 py-4 border-t border-white/10">
        <a href="/" className="flex items-center gap-2.5 px-5 py-3 text-sm text-white/85 hover:bg-white/6 rounded-md cursor-pointer">
          <LogOut size={16} /> Logout
        </a>
      </div>
    </aside>
  );
}
export default Sidebar;
