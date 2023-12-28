import DashboardSidebar from "@/components/dashboardSidebar/DashboardSidebar";
import Head from "next/head";
import classes from "../dashboard.module.css";
import CarsTable from "@/components/carsTable/CarsTable";
import { useRouter } from "next/router";
import request from "@/utils/request";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "@/components/loading/Loding";

const CarsDashboardPage = () => {
  const [carsData, setCarsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { admin } = useSelector((state) => state.admin);
  const router = useRouter();

  // fetch cars data
  useEffect(() => {
    const fetchCarsData = async () => {
      if (admin.token) {
        try {
          const { data } = await request.get("/api/cars/get/all?");
          if (data.ok) {
            setCarsData(data.data);
          }
        } catch (error) {
          console.log(error);
          if (error.response.data.message) {
            toast.error(error.response?.data?.message);
          }
        }
      } else {
        router.push("/");
      }
    };
    fetchCarsData();
  }, []);

  // check if token exist
  useEffect(() => {
    if (!admin.token) {
      router.push("/");
    }
  }, []);

  // set loading the page
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="carsDahsboardPage">
        <div className="row w-100">
          <div className="col-2">
            <DashboardSidebar />
          </div>
          <div className={`${classes.dashboardPageRightSection} col-10`}>
            <div className="container">
              <div className="mb-5 d-flex align-items-center justify-content-between">
                <h2 className="fw-bold">Cars</h2>
                <button
                  className="blacktoorange"
                  onClick={() => {
                    router.push("/dashboard/add-car");
                  }}
                >
                  Add car
                </button>
              </div>
              {carsData?.length > 0 ? (
                <div className={classes.card}>
                  <CarsTable setCarsData={setCarsData} carsData={carsData} />
                </div>
              ) : (
                <h5 className="ms-3" style={{ color: "var(--gray)" }}>
                  No cars
                </h5>
              )}
            </div>
          </div>
        </div>
      </div>
      {loading ? <Loading key={"loading"} /> : ""}
    </>
  );
};

export default CarsDashboardPage;
