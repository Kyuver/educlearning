function Hero() {
  return (
    <section className="hero">
      {" "}
      <div className="wrap hero-grid">
        {" "}
        <div className="hero-copy">
          {" "}
          <h1>
            Where Learning <span>Clicks.</span>
          </h1>{" "}
          <p className="lead">
            Interactive lessons in Math, Science, English, and more — built for
            Filipino high schoolers.
          </p>{" "}
        </div>{" "}
        <div className="hero-image">
          {" "}
          <img
            src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=700&q=80"
            alt="Student learning on a laptop"
          />{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
export default Hero;