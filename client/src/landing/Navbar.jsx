function Navbar() {
  return (
    <header className="nav">
      {" "}
      <div className="wrap nav-inner">
        {" "}
        <div className="logo">
          <span className="logo-mark">🎓</span> EducLearning
        </div>{" "}
        <ul className="nav-links">
          {" "}
          <li>
            <a href="#subjects">Subjects</a>
          </li>{" "}
          <li>
            <a href="#how-it-works">How It Works</a>
          </li>{" "}
          <li>
            <a href="#roles">Explore Roles</a>
          </li>{" "}
        </ul>{" "}
        <div className="nav-cta">
          {" "}
          <a href="#roles" className="btn btn-gold">
            Demo
          </a>{" "}
        </div>{" "}
        <button className="nav-toggle">☰</button>{" "}
      </div>{" "}
    </header>
  );
}
export default Navbar;
