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
      <Navbar /> <Hero />{" "}
      <div className="showcase-zone">
        {" "}
        <Showcase />{" "}
      </div>{" "}
      <div className="roles-zone">
        {" "}
        <Roles />{" "}
      </div>{" "}
      <Footer />{" "}
    </div>
  );
}
export default Landing;