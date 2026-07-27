function Navbar() {
  return (
    <nav className="navbar">
      {" "}
      <div className="logo">KULASRUM</div>{" "}
      <ul className="nav-links">
        {" "}
        <li>Subjects</li> <li>Tutorials</li> <li>Exercises</li>{" "}
        <li>Contact Us</li>{" "}
      </ul>{" "}
      <div className="nav-right">
        {" "}
        <span className="icon-placeholder">●</span>{" "}
        <span className="icon-placeholder">f</span>{" "}
        <span className="icon-placeholder">▶</span>{" "}
        <span className="icon-placeholder">in</span>{" "}
        <button className="login-btn">Login</button>{" "}
      </div>{" "}
    </nav>
  );
}
export default Navbar;
