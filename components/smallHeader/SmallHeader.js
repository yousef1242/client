import Link from "next/link";
import classes from "./smallHeader.module.css";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useSelector } from "react-redux";

const SmallHeader = () => {
  const { admin } = useSelector((state) => state.admin);
  
  return (
    <>
      <div className={classes.smallHeader}>
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <div
                className={`${classes.smallHeaderContactDiv}  justify-content-md-start justify-content-center`}
              >
                <span className={classes.smallHeaderContactIcon}>
                  <FaPhoneAlt />
                </span>
                <span className={classes.smallHeaderContactText}>
                  +01 123 456 78
                </span>
                <span className={classes.smallHeaderGapSign}></span>
                <span className={classes.smallHeaderContactIcon}>
                  <MdEmail />
                </span>
                <span className={classes.smallHeaderContactText}>
                  example@gmail.com
                </span>
              </div>
            </div>
            <div className="col-6 text-end d-none d-md-block">
              <Link
                href={admin !== null ? "/dashboard" : "/login"}
                className={classes.smallHeaderLoginText}
              >
                {admin !== null ? "Dashboard" : "Login"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmallHeader;
