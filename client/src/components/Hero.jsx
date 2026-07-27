function Hero() {
  return (
    <section className="hero">
      {" "}
      <div className="hero-circle"></div>{" "}
      <div className="hero-box">
        {" "}
        <p className="hero-title">THE NEW LEARNING EXPERIENCE</p>{" "}
        <div className="hero-register">
          {" "}
          <span>REGISTER NOW</span>{" "}
          <button className="arrow-btn">→</button>{" "}
        </div>{" "}
      </div>{" "}
      <div className="dots">
        {" "}
        <span className="dot active"></span> <span className="dot"></span>{" "}
        <span className="dot"></span>{" "}
      </div>{" "}
    </section>
  );
}
export default Hero;
