function CTABanner() {
  return (
    <section className="cta-banner">
      {" "}
      <img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
        alt="Students learning together"
      />{" "}
      <div className="wrap">
        {" "}
        <span className="eyebrow">Reach Out</span>{" "}
        <h2>GOT QUESTIONS OR FEEDBACK</h2>{" "}
        <p>
          Have thoughts on the architecture, suggestions for improvements, or
          just want to say hi? Send a message anytime.
        </p>{" "}
        <a href="#roles" className="btn btn-gold">
          Send a Message / Contact Us
        </a>{" "}
      </div>{" "}
    </section>
  );
}
export default CTABanner;
