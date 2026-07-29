import Navbar from "../_old-kulasrum-wireframe/Navbar";
import Hero from "../_old-kulasrum-wireframe/Hero";
import SubjectCard from "../_old-kulasrum-wireframe/SubjectCard";
import Footer from "../_old-kulasrum-wireframe/Footer";
const subjects = [
  "MATH",
  "ENGLISH",
  "SCIENCE",
  "ARALING PANLIPUNAN",
  "MAPEH",
  "TLE",
];
function Home() {
  return (
    <div>
      {" "}
      <Navbar /> <Hero />{" "}
      <div className="subjects-grid">
        {" "}
        {subjects.map((subject) => (
          <SubjectCard key={subject} name={subject} />
        ))}{" "}
      </div>{" "}
      <Footer />{" "}
    </div>
  );
}
export default Home;
