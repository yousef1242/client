import Footer from "@/components/footer/Footer";
import PageNameSection from "@/components/pageNameSection/PageNameSection";
import request from "@/utils/request";
import Head from "next/head";
import { useRouter } from "next/router";
import classes from "./singleCar.module.css";
import Slider from "react-slick";
import { FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { addCarToCompare } from "@/redux/compareSlice";

const SingleCarPage = ({ car, error, errorMessage }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <Head>
        <title>{router.query.carname}</title>
      </Head>
      <div className="singleCarPage">
        <PageNameSection
          title={router.query.carname}
          links={[
            { name: "Home", to: "/" },
            { name: "Cars", to: "/cars" },
            { name: router.query.carname, to: `/cars/${router.query.carname}` },
          ]}
        />
        <div className="container py-5">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-9">
              <div
                className={`${classes["car-slides-images"]} position-relative mb-4 p-2 p-md-4 shadow h-auto`}
              >
                <Slider className={classes["slider"]} {...settings}>
                  {car?.files?.map((file) => (
                    <img
                      key={file?.publicId}
                      loading="lazy"
                      className={`${classes["car-image"]} img-fluid`}
                      src={file?.url}
                      alt={`car-image-${file?.url}`}
                    />
                  ))}
                </Slider>
              </div>
              <div className="p-4 shadow w-100 col-9 d-none d-md-block">
                <h5
                  className={`fw-bold mb-5 position-relative ${classes["infotitle"]}`}
                >
                  CAR OVERVIEW
                </h5>
                <div
                  className={classes["car-desc"]}
                  dangerouslySetInnerHTML={{ __html: car?.description }}
                />
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <div className="mb-4 shadow p-3">
                <h4 className="fw-bold mb-4">{car?.price}EGP</h4>
                <button
                  className="orangetoblack w-100"
                  onClick={() => {
                    dispatch(addCarToCompare(car));
                  }}
                >
                  <span className="me-2">
                    <FaPlus />
                  </span>
                  <span>Add to compare</span>
                </button>
              </div>
              <div className="mb-4 shadow p-3 fw-bold">
                <h5
                  className={`mb-4 fw-bold border-bottom py-2 position-relative ${classes["infotitle"]}`}
                  style={{ color: "var(--black)" }}
                >
                  AUTO SPECIFICATIONS
                </h5>
                <p
                  className={`overflow-x-auto text-black ${classes["car-specs"]}`}
                >
                  {car?.specifications}
                </p>
              </div>
            </div>
            <div className="p-4 shadow w-100 col-9 d-block d-md-none">
              <h5
                className={`fw-bold mb-5 position-relative ${classes["infotitle"]}`}
              >
                CAR OVERVIEW
              </h5>
              <p className={classes["car-desc"]}>{car?.description}</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default SingleCarPage;

export async function getServerSideProps(context) {
  const { carname } = context.query;
  try {
    const { data } = await request.get(`/api/cars/get/single/${carname}`);
    if (data.ok) {
      return {
        props: {
          car: data.data,
        },
      };
    }
  } catch (error) {
    return {
      props: {
        errorMessage: error?.response?.data?.message,
        error: error,
      },
    };
  }
}
