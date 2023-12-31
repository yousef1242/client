import Link from "next/link";
import classes from "./mainHeader.module.css";
import { FaSearch } from "react-icons/fa";
import { FaBars, FaCodeCompare, FaX } from "react-icons/fa6";
import { useRouter } from "next/router";
import { useState } from "react";
import ShowSideHeader from "../showSideHeader/ShowSideHeader";
import toast from "react-hot-toast";
import CompareModel from "../compareModel/CompareModel";

const MainHeader = () => {
  const router = useRouter();
  const [showSideHeader, setShowSideHeader] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [showCompareModel, setShowCompareModel] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <div className={classes.mainHeader}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-8 col-md-4 d-flex align-items-center">
              <span
                style={{ fontSize: "20px", cursor: "pointer" }}
                onClick={() => setShowSideHeader(true)}
                className="d-flex d-md-none me-3"
              >
                <FaBars />
              </span>
              <Link href={`/`} className="fw-bold fs-4 text-black m-0">
                AUTO <span style={{ color: "var(--orange)" }}>SHOWROOM</span>
              </Link>
            </div>
            <div className="col-4 col-md-8 d-md-flex align-items-center direction-row justify-content-end">
              <div className={`${classes.mainHeaderLinks} d-none d-md-flex`}>
                <Link
                  className={
                    router.pathname === "/" ? classes.toOrangeColor : ""
                  }
                  href={`/`}
                >
                  Home
                </Link>
                <Link
                  className={
                    router.pathname === "/cars" ? classes.toOrangeColor : ""
                  }
                  href={`/cars`}
                >
                  Cars
                </Link>
                <Link
                  className={
                    router.pathname === "/about-us" ? classes.toOrangeColor : ""
                  }
                  href={`/about-us`}
                >
                  About Us
                </Link>
                <Link
                  className={
                    router.pathname === "/contact" ? classes.toOrangeColor : ""
                  }
                  href={`/contact`}
                >
                  Contact
                </Link>
              </div>
              <div
                className={`${classes.mainHeaderActions} d-flex align-items-center`}
              >
                <div className="position-relative">
                  <div
                    className={`search-input position-absolute shadow m-0 ${
                      openSearchBar ? "d-block" : "d-none"
                    }`}
                    style={{
                      bottom: "-68px",
                      background: "#fff",
                      left: "-150px",
                      zIndex: "999",
                      width: "219px",
                    }}
                  >
                    <div className="d-flex align-items-center fs-6 m-0">
                      <input
                        onChange={(e) => setSearchValue(e.target.value)}
                        value={searchValue}
                        type="text"
                        className="border-0"
                        placeholder="Search..."
                      />
                      <button
                        onClick={() => {
                          if (searchValue === "") {
                            toast.error("The required field cannot be empty.");
                          } else {
                            router.push(`/cars?name=${searchValue}`);
                            setOpenSearchBar(false);
                            setSearchValue("");
                          }
                        }}
                        className="orangetoblack bg-white text-black"
                      >
                        <FaSearch />
                      </button>
                      <button
                        onClick={() => setOpenSearchBar(false)}
                        className="orangetoblack bg-white text-black"
                      >
                        <FaX />
                      </button>
                    </div>
                  </div>
                  <span onClick={() => setOpenSearchBar(true)}>
                    <FaSearch />
                  </span>{" "}
                </div>
                <div>
                  <span onClick={() => setShowCompareModel(true)}>
                    <FaCodeCompare />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showSideHeader ? (
        <ShowSideHeader setShowSideHeader={setShowSideHeader} />
      ) : (
        ""
      )}
      {showCompareModel ? (
        <CompareModel setShowCompareModel={setShowCompareModel} />
      ) : (
        ""
      )}
    </>
  );
};

export default MainHeader;
