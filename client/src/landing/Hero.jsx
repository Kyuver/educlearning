function Hero() {
  return (
    <section className="hero">
      {" "}
      <div className="wrap hero-grid">
        {" "}
        <div className="hero-copy">
          {" "}
          <h1>
            Your Learning
            <br />
            Journey <span>Begins Here</span>
          </h1>{" "}
          <p className="lead">
            EducLearning brings high school learning to life through
            interactive, hands-on practice. Master core subjects like English,
            Math, Science, and Araling Panlipunan by working through lessons,
            exploring examples, and practicing concepts in real time.
          </p>{" "}
        </div>{" "}
        <div className="hero-photo">
          {" "}
          <img
            src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=700&q=80"
            alt="Student working on a laptop"
          />{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
export default Hero;
