import { useState, useEffect } from "react";
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [overviewOpen, setOverviewOpen] = useState(false);
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
            <a href="#hero">Home</a>
          </li>{" "}
          <li>
            {" "}
            <button
              className="nav-dropdown-btn"
              onClick={() => setOverviewOpen(!overviewOpen)}
            >
              {" "}
              Overview ▾{" "}
            </button>{" "}
            {overviewOpen && (
              <div className="nav-dropdown-menu">
                {" "}
                <a href="#student-view" onClick={() => setOverviewOpen(false)}>
                  Student View
                </a>{" "}
                <a href="#teacher-view" onClick={() => setOverviewOpen(false)}>
                  Teacher View
                </a>{" "}
                <a href="#admin-view" onClick={() => setOverviewOpen(false)}>
                  Admin View
                </a>{" "}
              </div>
            )}{" "}
          </li>{" "}
          <li>
            <a href="#roles">Demos</a>
          </li>{" "}
        </ul>{" "}
        <button className="nav-toggle">☰</button>{" "}
      </div>{" "}
    </header>
  );
}
export default Navbar;