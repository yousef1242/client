import Head from "next/head";
import classes from "./heroSection.module.css";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import Loading from "../loading/Loding";

const HeroSection = () => {
  const router = useRouter();
  const [name, setName] = useState("");

  //   search car function
  const searchCarFunction = (e) => {
    e.preventDefault();
    if (name.trim() === "") {
      return toast.error("The required field cannot be empty.");
    }
    router.push(`/cars?name=${name}`);
  };

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className={classes.heroSection}>
        <div className="overlay"></div>
        <div className="container z-1">
          <div className="row">
            <div className="col-12 col-md-7">
              <h1 className="mb-4 fw-bold text-white">
                Welcome to{" "}
                <span style={{ color: "var(--orange)" }}>MOTOR ONE</span>
              </h1>
              <p className="mb-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Doloribus repudiandae nobis perferendis minus dolore a
                architecto eius totam. Eveniet, rerum! Corrupti eius saepe
                perspiciatis architecto rerum totam, dolor quod sint?
              </p>
              <button
                onClick={() => {
                  router.push("/cars");
                }}
                className="orangetoblack"
              >
                View cars
              </button>
            </div>
            <div className="col-4 d-none d-md-block bg-white p-0">
              <div className={classes.searchBox}>
                <div className={classes.searchBoxHeader}>
                  <h5 className="fw-bold">FIND YOUR CAR</h5>
                </div>
                <div className={classes.searchBoxContent}>
                  <form onSubmit={searchCarFunction}>
                    <div className={classes.formGroup}>
                      <label htmlFor="name">Car name</label>
                      <input
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="BMW"
                        id="name"
                      />
                    </div>
                    <button className="orangetoblack">Search</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* search box in small devices */}
      <div className="searchBoxInSmallDevices py-5 px-3 d-md-none d-block">
        <div className={classes.searchBox}>
          <div className={classes.searchBoxHeader}>
            <h5 className="fw-bold">FIND YOUR CAR</h5>
          </div>
          <div className={classes.searchBoxContent}>
            <form onSubmit={searchCarFunction}>
              <div className={classes.formGroup}>
                <label htmlFor="name">Car name</label>
                <input
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="BMW"
                  id="name"
                />
              </div>
              <button className="orangetoblack">Search</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
