import PageNameSection from "@/components/pageNameSection/PageNameSection";
import request from "@/utils/request";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import classes from "./cars.module.css";
import { FaFilter, FaX } from "react-icons/fa6";
import Footer from "@/components/footer/Footer";

const CarsPage = ({ cars }) => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [carsData, setCarsData] = useState([]);
  const [openFilterModel, setOpenFilterModel] = useState(false);
  const router = useRouter();
  const yearsArray = [];
  for (let year = 2000; year <= 2024; year++) {
    yearsArray.push(year);
  }

  // set cars data
  useEffect(() => {
    setCarsData(cars);
  }, [cars]);

  // fetch categories data
  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const { data } = await request.get("/api/categories/get/all");
        if (data.ok) {
          setCategoriesData(data.data);
        }
      } catch (error) {
        console.log(error);
        if (error?.response?.data?.message) {
          toast.error(error.response?.data?.message);
        }
      }
    };
    fetchCategoriesData();
  }, []);

  // set page query in url
  useEffect(() => {
    router.push({ query: { ...router.query, page: 1 } });
  }, []);

  return (
    <>
      <Head>
        <title>Cars</title>
      </Head>
      <div className="carsPage">
        <PageNameSection
          key={"pageNameSection"}
          title={"Cars"}
          links={[
            { name: "Home", to: "/" },
            { name: "Cars", to: "/cars" },
          ]}
        />
        <div className="container py-5">
          <div className="row">
            <div
              className={`col-3 h-100 ${
                openFilterModel ? "d-block" : "d-none"
              } d-md-block py-3 shadow ${classes.filterCarsModel}`}
            >
              <div className="py-3 d-md-none text-end pe-2">
                <span
                  onClick={() => setOpenFilterModel(false)}
                  style={{ cursor: "pointer" }}
                >
                  <FaX />
                </span>
              </div>
              <div className="mb-3">
                <span className="fw-bold d-block mb-3">Category</span>
                <select
                  value={router.query.category}
                  onChange={(e) =>
                    router.push(
                      { query: { ...router.query, category: e.target.value } },
                      undefined,
                      { scroll: false }
                    )
                  }
                >
                  <option disabled selected>
                    All categories
                  </option>
                  {categoriesData?.map((cat) => (
                    <>
                      <option value={cat?.title} key={cat?._id}>
                        {cat?.title}
                      </option>
                    </>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <span className="fw-bold d-block mb-3">Model</span>
                <select
                  value={router.query.model ? router.query.model : ""}
                  onChange={(e) =>
                    router.push(
                      { query: { ...router.query, model: e.target.value } },
                      undefined,
                      { scroll: false }
                    )
                  }
                >
                  <option disabled selected>
                    All models
                  </option>
                  {yearsArray?.map((year) => (
                    <>
                      <option value={year} key={year}>
                        {year}
                      </option>
                    </>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <span className="fw-bold d-block mb-3">Colors</span>
                <form>
                  {[
                    "red",
                    "black",
                    "white",
                    "blue",
                    "green",
                    "yellow",
                    "orange",
                    "silver",
                    "brown",
                  ]?.map((color) => (
                    <div key={color} className="mb-2 d-flex gap-2">
                      <input
                        value={router.query.color}
                        onChange={(e) =>
                          router.push(
                            {
                              query: { ...router.query, color },
                            },
                            undefined,
                            { scroll: false }
                          )
                        }
                        name="colorGroup"
                        className="d-inline-block w-auto"
                        type="radio"
                      />
                      <span className="text-capitalize">{color}</span>
                    </div>
                  ))}
                </form>
              </div>
              <div className="mt-5">
                <button
                  className="w-100 blacktoorange"
                  onClick={() =>
                    router.push(
                      { query: { page: router.query.page } },
                      undefined,
                      { scroll: false }
                    )
                  }
                >
                  Reset
                </button>
              </div>
            </div>
            <div className="col-12 col-md-9">
              <div className="carslength fw-bold filterbutton mb-5 d-flex align-items-center justify-content-between">
                <div>{carsData?.length} Cars Available</div>
                <button
                  className="border bg-body text-black d-md-none"
                  onClick={() => setOpenFilterModel(true)}
                >
                  Filter <FaFilter />
                </button>
              </div>
              {carsData?.length > 0 ? (
                <div className="row">
                  {carsData?.map((car) => (
                    <div className="col-12 col-md-6 mb-3">
                      <Link
                        href={`/cars/${car?.name}`}
                        className="card border-0 shadow rounded"
                      >
                        <div className="mb-4">
                          <Image
                            width={300}
                            className="object-fit-cover w-100"
                            height={300}
                            src={car?.files[0]?.url}
                            loading="lazy"
                            alt=""
                            quality="100"
                          />
                        </div>
                        <div className="px-2 pb-3">
                          <h5
                            className="fw-bold mb-3"
                            style={{ color: "var(--orange)" }}
                          >
                            {car?.name}
                          </h5>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: car?.description?.slice(0, 119),
                            }}
                            className="fw-light mb-4"
                          />
                          <div className="d-flex text-center g-4 align-items-center">
                            <div
                              className="w-100 mx-1 text-black-50 py-2"
                              style={{ background: "#f1f1f1" }}
                            >
                              {car?.category}
                            </div>
                            <div
                              className="w-100 mx-1 text-black-50 py-2"
                              style={{ background: "#f1f1f1" }}
                            >
                              {car?.model}
                            </div>
                            <div
                              className="w-100 mx-1 text-black-50 py-2 text-uppercase"
                              style={{ background: "#f1f1f1" }}
                            >
                              {car?.color}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="shadow p-4 py-5 text-warning">
                  No products were found matching your selection.
                </div>
              )}
              <div className="col-12 d-flex align-items-centre gap-2 px-2 justify-content-center pagination mt-5">
                {router.query.page > 1 ? (
                  <button
                    onClick={() => {
                      if (router.query.page) {
                        const pageNumber = parseInt(router.query.page);
                        router.push(
                          {
                            query: {
                              ...router.query,
                              page: pageNumber - 1,
                            },
                          },
                          undefined,
                          { scroll: false }
                        );
                      }
                    }}
                    className="w-50 bg-black bg-opacity-50 border-0"
                  >
                    Previous page
                  </button>
                ) : (
                  ""
                )}
                {carsData?.length > 0 && router.query.page ? (
                  <button
                    onClick={() => {
                      if (router.query.page) {
                        const pageNumber = parseInt(router.query.page);
                        router.push(
                          {
                            query: {
                              ...router.query,
                              page: pageNumber + 1,
                            },
                          },
                          undefined,
                          { scroll: false }
                        );
                      } else {
                        const pageNumber = 1;
                        router.push(
                          {
                            query: {
                              ...router.query,
                              page: pageNumber,
                            },
                          },
                          undefined,
                          { scroll: false }
                        );
                      }
                    }}
                    className="w-50 bg-black bg-opacity-50 border-0"
                  >
                    Next page
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default CarsPage;

export async function getServerSideProps(context) {
  const { name, category, model, color, page } = context.query;
  try {
    const { data } = await request.get(
      `/api/cars/get/all?name=${name}&category=${category}&model=${model}&color=${color}&page=${page || 1}`
    );
    if (data.ok) {
      return {
        props: {
          cars: data.data,
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
