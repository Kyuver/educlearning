import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SubjectCard from "../components/SubjectCard";
import Footer from "../components/Footer";
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
