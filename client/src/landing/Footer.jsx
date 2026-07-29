import { GraduationCap } from "lucide-react";
function Footer() {
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
      </div>{" "}
      <p className="footer-note">
        KlikAral — a student capstone project. Not affiliated with any real
        institution.
      </p>{" "}
    </footer>
  );
}
export default Footer;