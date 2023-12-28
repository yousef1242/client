import Link from "next/link";
import classes from "./showSideHeader.module.css";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/router";

const ShowSideHeader = ({ setShowSideHeader }) => {
  const router = useRouter();
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
      </div>
    </>
  );
};

export default ShowSideHeader;
