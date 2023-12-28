import Link from "next/link";
import classes from "./showSideHeader.module.css";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const ShowSideHeader = ({ setShowSideHeader }) => {
  const router = useRouter();
  const { admin } = useSelector((state) => state.admin);

  return (
    <>
      <div className={classes.ovelay}></div>
      <div className={classes.showSideHeader}>
        <div className={classes.ShowSideHeaderTop}>
          <span onClick={() => setShowSideHeader(false)}>
            <IoClose />
          </span>
        </div>
        <div className={classes.ShowSideHeaderLinks}>
          <Link
            className={router.pathname === "/" ? classes.toOrangeColor : ""}
            href={`/`}
          >
            Home
          </Link>
          <Link
            className={router.pathname === "/cars" ? classes.toOrangeColor : ""}
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
          <Link
            href={admin !== null ? "/dashboard" : "/login"}
            className={
              router.pathname === "/login" || router.pathname === "/dashboard"
                ? classes.toOrangeColor
                : ""
            }
          >
            {admin !== null ? "Dashboard" : "Login"}
          </Link>
        </div>
      </div>
    </>
  );
};

export default ShowSideHeader;
