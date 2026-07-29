import { motion } from "motion/react";
import { GraduationCap, BookOpen, Settings2, Film } from "lucide-react";
const previews = [
  {
    id: "student-view",
    icon: GraduationCap,
    title: "Student view",
    desc: "Browse subjects and lessons at your own pace, with everything organized in one clean dashboard.",
  },
  {
    id: "teacher-view",
    icon: BookOpen,
    title: "Teacher view",
    desc: "Create and edit lesson content in real time, and add new subjects whenever you need to.",
  },
  {
    id: "admin-view",
    icon: Settings2,
    title: "Admin view",
    desc: "Approve or remove subjects and teacher submissions, with a full overview of the platform.",
  },
];
function Showcase() {
  return (
    <>
      {" "}
      {previews.map((p, i) => {
        const Icon = p.icon;
        const isReverse = i % 2 === 1;
        const textFromX = isReverse ? 50 : -50;
        const gifFromX = isReverse ? -50 : 50;
        return (
          <section
            id={p.id}
            key={p.id}
            className={`showcase-section${isReverse ? " reverse" : ""}`}
          >
            {" "}
            <div className="wrap showcase-inner">
              {" "}
              <motion.div
                className="showcase-text"
                initial={{ opacity: 0, x: textFromX }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ type: "spring", stiffness: 80, damping: 14 }}
              >
                {" "}
                <span className="eyebrow">Demo Views</span>{" "}
                <h3>
                  <Icon
                    size={22}
                    style={{ verticalAlign: "middle", marginRight: "8px" }}
                  />
                  {p.title}
                </h3>{" "}
                <p>{p.desc}</p>{" "}
              </motion.div>{" "}
              <motion.div
                className="showcase-gif"
                initial={{ opacity: 0, x: gifFromX, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 14,
                  delay: 0.1,
                }}
              >
                {" "}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  {" "}
                  <Film size={28} />{" "}
                  <span>GIF placeholder — {p.title} demo</span>{" "}
                </motion.div>{" "}
              </motion.div>{" "}
            </div>{" "}
          </section>
        );
      })}{" "}
    </>
  );
}
export default Showcase;