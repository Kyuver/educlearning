import "./Landing.css";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Roles from "./Roles";
import CTABanner from "./CTABanner";
function Landing() {
  return (
    <div className="landing">
      {" "}
      <Navbar /> <Hero /> <Roles /> <CTABanner />{" "}
    </div>
  );
}
export default Landing;