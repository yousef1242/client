import classes from "./aboutSection.module.css";
import aboutSectionImage from "../../public/By my car-bro.svg";
import Image from "next/image";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import { IoMdTimer } from "react-icons/io";
import { MdTimeline } from "react-icons/md";

const AboutSection = () => {
  return (
    <>
      <div className={classes.aboutSection}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md-7 mb-4">
              <h2 className="fw-bold mb-5 position-relative">
                WELCOME TO AUTO{" "}
                <span style={{ color: "var(--orange)" }}>SHOWROOM</span>
              </h2>
              <p className="mb-4">
                Auto Showroom Theme is a clean and modern design which is useful
                for Car Dealer, Auto Dealer, Automotive WordPress website and
                any other automotive dealership business, who sell, buy or lease
                vehicles via website. Its stunning beauty, fashionable clean
                look and proper execution, accompanying with making use of
                powerful plugins will help you to own an amazing site.
              </p>
              <p>
                This theme provides you with full functions for your automotive
                business. Start Creating Your Superb Website In No Time with
                AutoShowroom.
              </p>
            </div>
            <div className="col-12 col-md-5 mb-4">
              <Image
                src={aboutSectionImage}
                alt="aboutSectionImage"
                loading="lazy"
              />
            </div>
            <div className="col-12 col-md-4 mb-3 mb-md-0">
              <div className="card border-0" style={{ background: "none" }}>
                <div
                  className="card-header border-0"
                  style={{ background: "none" }}
                >
                  <div className={classes.aboutSectionIconDiv}>
                    <span>
                      <HiOutlineWrenchScrewdriver />
                    </span>
                  </div>
                </div>
                <div className="card-body">
                  <h5 className="mb-3 fw-bold">HIGHLY-TRAINED STAFF</h5>
                  <p>
                    Support is always our highest priority. With support members
                    spread across the world, we provide all around support.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4 mb-3 mb-md-0">
              <div className="card border-0" style={{ background: "none" }}>
                <div
                  className="card-header border-0"
                  style={{ background: "none" }}
                >
                  <div className={classes.aboutSectionIconDiv}>
                    <span>
                      <IoMdTimer />
                    </span>
                  </div>
                </div>
                <div className="card-body">
                  <h5 className="mb-3 fw-bold">FAST & EFFECTIVE SERVICE</h5>
                  <p>
                    Support is always our highest priority. With support members
                    spread across the world, we provide all around support.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="card border-0" style={{ background: "none" }}>
                <div
                  className="card-header border-0"
                  style={{ background: "none" }}
                >
                  <div className={classes.aboutSectionIconDiv}>
                    <span>
                      <MdTimeline />
                    </span>
                  </div>
                </div>
                <div className="card-body">
                  <h5 className="mb-3 fw-bold">SUPPORT 24/7</h5>
                  <p>
                    Support is always our highest priority. With support members
                    spread across the world, we provide all around support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutSection;
