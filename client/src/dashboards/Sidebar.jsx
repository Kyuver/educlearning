import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, BookOpen, LogOut, GraduationCap } from "lucide-react";

function Sidebar({ subjects, selectedSubjectId, onSelectSubject, topItem, onLogout }) {
  const [coursesOpen, setCoursesOpen] = useState(true);

  return (
    <aside className="w-64 h-screen sticky top-0 bg-gradient-to-b from-[#7c5cfc] to-[#2a2049] text-white flex flex-col shrink-0">
      <div className="px-6 py-5 text-lg font-bold text-white flex gap-2">
        <GraduationCap className="mt-0.5"/>
        KlikAral</div>
      <nav className="flex-1 overflow-y-auto">
        {topItem}
        <div
          className="flex items-center gap-2.5 px-5 py-3 text-sm cursor-pointer border-l-3 border-transparent hover:bg-white/6"
          onClick={() => setCoursesOpen(!coursesOpen)}
        >
          <BookOpen size={16} /> Courses
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
                    "px-5 py-2.5 pl-10 text-sm cursor-pointer first-letter:uppercase " +
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
      <div className="px-4 py-4 border-t border-white/10">
        <button
          onClick={() => (onLogout ? onLogout() : (window.location.href = "/"))}
          className="w-full flex items-center gap-2.5 px-5 py-3 text-sm text-white/85 hover:bg-white/6 rounded-md cursor-pointer text-left"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
}
export default Sidebar;
