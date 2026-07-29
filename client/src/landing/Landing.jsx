import "./Landing.css";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Showcase from "./Showcase";
import Roles from "./Roles";
import Footer from "./Footer";
function Landing() {
  return (
    <div className="landing">
      {" "}
      <Navbar />{" "}
      <div className="dark-zone">
        {" "}
        <Hero /> <Showcase /> <Roles />{" "}
      </div>{" "}
      <Footer />{" "}
    </div>
  );
}
export default Landing;