import { useState } from "react";
import { useSelector } from "react-redux";
import classes from "./dashboardSidebar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoIosArrowForward } from "react-icons/io";

const DashboardSidebar = () => {
  const router = useRouter();
  const { admin } = useSelector((state) => state.admin);

  const [openDropdowns, setOpenDropdowns] = useState({
    dashboard: false,
    cars: false,
    categories: false,
    opinions: false,
    sellcar: false,
    admins: false,
    // Add more dropdowns as needed
  });

  const handleDropdownClick = (dropdown) => {
    setOpenDropdowns((prevOpenDropdowns) => ({
      ...prevOpenDropdowns,
      [dropdown]: !prevOpenDropdowns[dropdown],
    }));
  };

  return (
    <>
      <div className={`${classes.dashboardSidebar}`}>
        <div className={classes.dashboardSidebarTop}>
          <h4 className="fw-bold">Welcome back!</h4>
          <h5>{admin?.name}</h5>
        </div>
        <div className={classes.dashboardSidebarLinks}>
          <div
            className={classes.dropdown}
            onClick={() => handleDropdownClick("dashboard")}
          >
            <div
              className="d-flex justify-content-between"
              style={{ cursor: "pointer" }}
            >
              <span>Dashboard</span>
              <span
                className={openDropdowns.dashboard ? classes.transformIcon : ""}
              >
                <IoIosArrowForward />
              </span>
            </div>
            {openDropdowns.dashboard && (
              <div className={classes.dropdownContent}>
                <Link
                  className={
                    router.pathname === "/dashboard"
                      ? classes.toOrangeColor
                      : ""
                  }
                  href={`/dashboard`}
                >
                  Dashboard
                </Link>
              </div>
            )}
          </div>
          {/* cars Dropdown */}
          <div
            className={classes.dropdown}
            onClick={() => handleDropdownClick("cars")}
          >
            <div
              className="d-flex justify-content-between"
              style={{ cursor: "pointer" }}
            >
              <span>Cars</span>
              <span
                className={openDropdowns.cars ? classes.transformIcon : ""}
              >
                <IoIosArrowForward />
              </span>
            </div>
            {openDropdowns.cars && (
              <div className={classes.dropdownContent}>
                <Link
                  className={
                    router.pathname === "/dashboard/cars"
                      ? classes.toOrangeColor
                      : ""
                  }
                  href={`/dashboard/cars`}
                >
                  cars
                </Link>
                <Link
                  className={
                    router.pathname === "/dashboard/add-car"
                      ? classes.toOrangeColor
                      : ""
                  }
                  href={`/dashboard/add-car`}
                >
                  Add car
                </Link>
              </div>
            )}
          </div>
          {/* Categories Dropdown */}
          <div
            className={classes.dropdown}
            onClick={() => handleDropdownClick("categories")}
          >
            <div
              className="d-flex justify-content-between"
              style={{ cursor: "pointer" }}
            >
              <span>Categories</span>
              <span
                className={
                  openDropdowns.categories ? classes.transformIcon : ""
                }
              >
                <IoIosArrowForward />
              </span>
            </div>
            {openDropdowns.categories && (
              <div className={classes.dropdownContent}>
                <Link
                  className={
                    router.pathname === "/dashboard/categories"
                      ? classes.toOrangeColor
                      : ""
                  }
                  href={`/dashboard/categories`}
                >
                  Categories
                </Link>
              </div>
            )}
          </div>
          {/* Opinions Dropdown */}
          <div
            className={classes.dropdown}
            onClick={() => handleDropdownClick("opinions")}
          >
            <div
              className="d-flex justify-content-between"
              style={{ cursor: "pointer" }}
            >
              <span>Opinions</span>
              <span
                className={openDropdowns.opinions ? classes.transformIcon : ""}
              >
                <IoIosArrowForward />
              </span>
            </div>
            {openDropdowns.opinions && (
              <div className={classes.dropdownContent}>
                <Link
                  className={
                    router.pathname === "/dashboard/opinions"
                      ? classes.toOrangeColor
                      : ""
                  }
                  href={`/dashboard/opinions`}
                >
                  Opinions
                </Link>
              </div>
            )}
          </div>
          {/* Sellcar Dropdown */}
          <div
            className={classes.dropdown}
            onClick={() => handleDropdownClick("sellcar")}
          >
            <div
              className="d-flex justify-content-between"
              style={{ cursor: "pointer" }}
            >
              <span>Sell_Car</span>
              <span
                className={openDropdowns.sellcar ? classes.transformIcon : ""}
              >
                <IoIosArrowForward />
              </span>
            </div>
            {openDropdowns.sellcar && (
              <div className={classes.dropdownContent}>
                <Link
                  className={
                    router.pathname === "/dashboard/sell-cars"
                      ? classes.toOrangeColor
                      : ""
                  }
                  href={`/dashboard/sell-cars`}
                >
                  Sell_Car
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
