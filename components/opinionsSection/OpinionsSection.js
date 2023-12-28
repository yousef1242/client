import Slider from "react-slick";
import classes from "./opinionsSection.module.css";
import fetchOpinions from "@/utils/fetchOpinions";
import { useEffect, useState } from "react";

const OpinionsSection = () => {
  const [opinions, setOpinions] = useState([]);

  const handleFetchOpinions = async () => {
    try {
      const fetchedOpinions = await fetchOpinions();
      setOpinions(fetchedOpinions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFetchOpinions();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className={classes.opinionsSection}>
        <div className={`${classes.container} container`}>
          <div>
            <h2 className="fw-bold position-relative text-center mb-5">
              What they <span style={{ color: "var(--orange)" }}>said</span>
            </h2>
            <Slider className={classes.slider} {...settings}>
              {opinions?.map((opinion, index) => (
                <div className="p-2 mb-3">
                  <div
                    key={opinion?._id}
                    className={
                      index % 2 === 0
                        ? classes.opinionsSectionSliderBoxYellow
                        : classes.opinionsSectionSliderBoxGreen
                    }
                  >
                    <div className="d-flex mb-3 text-capitalize justify-content-center align-items-center">
                      <div
                        className={classes.opinionsSectionSliderBoxImageLetter}
                      >
                        {opinion?.name?.charAt(0)}
                      </div>
                    </div>
                        <span className="fw-bold w-100 text-center text-capitalize d-block mb-4">{opinion?.name}</span>
                    <p>{opinion?.message}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
};

export default OpinionsSection;
