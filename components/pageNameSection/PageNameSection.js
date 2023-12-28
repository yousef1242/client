import Link from "next/link";
import classes from "./pageNameSection.module.css";
import React from "react";

const PageNameSection = ({ title, links }) => {
  return (
    <>
      <div className={classes.pageNameSection}>
        <div
          className={classes.pageNameSectionContent}
        >
          <h3 className="mb-3 fw-bold text-white text-center">{title}</h3>
          <div>
            {links?.slice(0, -1).map((link, index) => (
              <React.Fragment key={index}>
                <Link href={link?.to}>{link?.name}</Link>
                 <span className="mx-3">/</span>
              </React.Fragment>
            ))}
            <span>{links?.[links.length - 1]?.name}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNameSection;
