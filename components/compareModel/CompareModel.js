import Slider from "react-slick";
import classes from "./compareModel.module.css";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { FaX } from "react-icons/fa6";
import { removeCarFromComparing } from "@/redux/compareSlice";

const CompareModel = ({ setShowCompareModel }) => {
  const { compareArr } = useSelector((state) => state.compareArr);
  const dispatch = useDispatch();

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div
        className={`"compareModel py-5 overflow-scroll position-fixed top-0" ${classes.compareModel}`}
      >
        <div className="close-compare-model-btn text-end pe-3 mb-3">
          <button
            onClick={() => setShowCompareModel(false)}
            className="blacktoorange"
          >
            <FaX />
          </button>
        </div>
        <div className="container">
          <div className={`shadow bg-white ${classes.CompareModelBox}`}>
            {compareArr?.length > 0 ? (
              <div className="compare-slider">
                <Slider className={classes.slider} {...settings}>
                  {compareArr?.map((compareCar) => (
                    <div className="px-3 pt-3">
                      <div className="compare-car-img">
                        <img loading="lazy" src={compareCar?.files[0]?.url} alt="altcompare-car-image" />
                      </div>
                      <div className="compare-car-name py-3 text-center border-bottom">
                        <span style={{ color: "var(--orange)" }}>
                          {compareCar?.category}
                        </span>
                        <h6 className="fw-bold mt-2">{compareCar?.name}</h6>
                      </div>
                      <div className="compare-car-spesc py-3 border-bottom">
                        <div className="mb-2">
                          <span className="fw-bold me-2">Model: </span>
                          <span>{compareCar?.model}</span>
                        </div>
                        <div className="mb-2">
                          <span className="fw-bold me-2">Color: </span>
                          <span>{compareCar?.color}</span>
                        </div>
                        <div className="mb-2">
                          <span className="fw-bold me-2">Category: </span>
                          <span>{compareCar?.category}</span>
                        </div>
                      </div>
                      <div className="compare-car-price py-3 d-flex align-items-center justify-content-between text-center border-bottom">
                        <span
                          className="fw-bold"
                          style={{ color: "var(--orange)" }}
                        >
                          {compareCar?.price}EGP
                        </span>
                        <button className="orangetoblack">
                          <Link
                            className="text-white"
                            href={`/cars/${compareCar?.name}`}
                          >
                            VIEW MORE
                          </Link>
                        </button>
                      </div>
                      <div className="py-3 text-center">
                        <button
                          onClick={() => {
                            dispatch(
                              removeCarFromComparing({
                                _id: compareCar?._id,
                              })
                            );
                          }}
                          className="bg-black text-white border-0"
                        >
                          <span className="me-2">
                            <FaX />
                          </span>
                          <span>REMOVE</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            ) : (
              <div className="text-center py-3 fw-bold">No cars to compare</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CompareModel;
