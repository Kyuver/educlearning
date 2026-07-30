function Hero() {
  return (
    <section className="hero-zone">
      {" "}
      <video className="hero-video" autoPlay muted loop playsInline>
        {" "}
<source src="https://videos.pexels.com/video-files/10602890/10602890-hd_1920_1080_30fps.mp4" type="video/mp4" />      </video>{" "}
      <div className="wrap hero-center">
        {" "}
        <h1>
          Where Learning <span>Clicks.</span>
        </h1>{" "}
        <p className="lead">
          Interactive lessons in Math, Science, English, and more — built for
          Filipino high schoolers.
        </p>{" "}
        <a href="#roles" className="btn btn-gold hero-cta">
          Demo
        </a>{" "}
      </div>{" "}
    </section>
  );
}
export default Hero;