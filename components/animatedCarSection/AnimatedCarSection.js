// AnimatedCarSection.jsx
import React, { useState, useEffect } from "react";
import classes from "./animatedCarSection.module.css";
import animatedCarImage from "../../public/animatedCar.png";
import Image from "next/image";

const AnimatedCarSection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollValue = window.scrollY;
      setScrollPosition(scrollValue);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="py-5 bg-white">
      <div className={classes["animated-car-container"]}>
        <Image
          loading="lazy"
          src={animatedCarImage}
          className={classes["animated-car-image"]}
          alt=""
          style={{ transform: `translateX(${100 - scrollPosition}px)` }}
        />
      </div>
    </div>
  );
};

export default AnimatedCarSection;
