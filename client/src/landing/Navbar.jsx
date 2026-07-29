function Navbar() {
  return (
    <header className="nav">
      {" "}
      <div className="wrap nav-inner">
        {" "}
        <div className="logo">🎓 KlikAral </div>{" "}
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
        <div className="nav-cta">
          {" "}
          <a href="#roles" className="btn btn-gold btn-sm">
            Demo
          </a>{" "}
        </div>{" "}
        <button className="nav-toggle">☰</button>{" "}
      </div>{" "}
    </header>
  );
}
export default Navbar;