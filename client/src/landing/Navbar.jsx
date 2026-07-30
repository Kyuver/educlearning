import { useState, useEffect } from "react";
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > window.innerHeight * 0.85);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`}>
      {" "}
      <div className="nav-inner">
        {" "}
        <div className="logo">🎓 KlikAral</div>{" "}
        <ul className="nav-links">
          {" "}
          <li>
            <a href="#student-view">Student View</a>
          </li>{" "}
          <li>
            <a href="#teacher-view">Teacher View</a>
          </li>{" "}
          <li>
            <a href="#admin-view">Admin View</a>
          </li>{" "}
        </ul>{" "}
        <button className="nav-toggle">☰</button>{" "}
      </div>{" "}
    </header>
  );
}
export default Navbar;