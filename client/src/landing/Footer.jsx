import { useState } from "react";
import { GraduationCap } from "lucide-react";
function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }
  return (
    <footer className="site-footer">
      {" "}
      <div className="wrap">
        {" "}
        <div className="footer-grid">
          {" "}
          <div className="footer-col">
            {" "}
            <div className="footer-brand">
              <GraduationCap size={18} /> KlikAral
            </div>{" "}
            <p className="footer-tagline">
              Interactive high school learning for Filipino students — built as
              a student capstone project.
            </p>{" "}
          </div>{" "}
          <div className="footer-col">
            {" "}
            <p className="footer-heading">Contact</p> <p>+63 900 000 0000</p>{" "}
            <p>hello@klikaral.ph</p> <p>Manila, Philippines</p>{" "}
          </div>{" "}
          <div className="footer-col">
            {" "}
            <p className="footer-heading">Info</p> <p>www.klikaral.ph</p>{" "}
            <p>Mon–Fri, 8:00 AM–5:00 PM</p>{" "}
            <div className="footer-badges">
              {" "}
              <span>React</span> <span>Express</span>{" "}
              <span>PostgreSQL</span>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div className="footer-feedback">
          {" "}
          <h3>Have a question or feedback?</h3>{" "}
          {submitted ? (
            <p>Thanks! We'll get back to you soon.</p>
          ) : (
            <form className="footer-feedback-form" onSubmit={handleSubmit}>
              {" "}
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />{" "}
              <textarea
                placeholder="Your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>{" "}
              <button type="submit" className="btn btn-gold btn-sm">
                Send
              </button>{" "}
            </form>
          )}{" "}
        </div>{" "}
      </div>{" "}
      <p className="footer-note">
        KlikAral — a student capstone project. Not affiliated with any real
        institution.
      </p>{" "}
    </footer>
  );
}
export default Footer;