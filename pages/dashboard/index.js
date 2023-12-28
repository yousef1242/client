import Head from "next/head";
import classes from "./dashboard.module.css";
import DashboardSidebar from "@/components/dashboardSidebar/DashboardSidebar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Loading from "@/components/loading/Loding";
import toast from "react-hot-toast";
import request from "@/utils/request";
import { IoCarSport } from "react-icons/io5";
import { MdCategory } from "react-icons/md";
import { FaUserLock } from "react-icons/fa";
import { LiaThinkPeaks } from "react-icons/lia";
import AdminsTable from "@/components/adminsTable/AdminsTable";
import AddAdminModel from "@/components/addAdminModel/AddAdminModel";
import Rechart from "@/components/rechart/Rechart";

const DashboardPage = () => {
  const [fetchData, setFetchData] = useState({
    cars: [],
    categories: [],
    opinions: [],
    admins: [],
  });
  const { admin } = useSelector((state) => state.admin);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [addAdminModel, setAddAdminModel] = useState(false);

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

  // fetch cars data
  useEffect(() => {
    const fetchCarsData = async () => {
      if (admin.token) {
        try {
          const { data } = await request.get("/api/cars/get/all");
          if (data.ok) {
            setFetchData((prevData) => ({
              ...prevData,
              cars: data.data,
            }));
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

  // fetch categories data
  useEffect(() => {
    const fetchCategoriesData = async () => {
      if (admin.token) {
        try {
          const { data } = await request.get("/api/categories/get/all");
          if (data.ok) {
            setFetchData((prevData) => ({
              ...prevData,
              categories: data.data,
            }));
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
    fetchCategoriesData();
  }, []);

  // fetch admins data
  useEffect(() => {
    const fetchAdminsData = async () => {
      if (admin.token) {
        try {
          const { data } = await request.get("/api/admins/get/all", {
            headers: {
              Authorization: "bearer " + admin.token,
            },
          });
          if (data.ok) {
            setFetchData((prevData) => ({
              ...prevData,
              admins: data.data,
            }));
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
    fetchAdminsData();
  }, []);

  // fetch opinions data
  useEffect(() => {
    const fetchOpinionsData = async () => {
      if (admin.token) {
        try {
          const { data } = await request.get("/api/opinions/get/all");
          if (data.ok) {
            setFetchData((prevData) => ({
              ...prevData,
              opinions: data.data,
            }));
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
    fetchOpinionsData();
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className={classes.dashboardPage}>
        <div className="row w-100">
          <div className="col-2">
            <DashboardSidebar />
          </div>
          <div className={`${classes.dashboardPageRightSection} col-10`}>
            <div className="container">
              <h2 className="mb-5 fw-bold">Overview</h2>
              <div className="row">
                {/* cars box */}
                <div className="col-12 col-sm-6 col-md-3 mb-3 mb-md-0">
                  <div className={classes.card}>
                    <div className={classes.cardHeader}>
                      <span>
                        <IoCarSport />
                      </span>
                    </div>
                    <div className={classes.cardContent}>
                      <span className="me-2 fw-bold">
                        {fetchData?.cars?.length}
                      </span>
                      <span>Cars</span>
                    </div>
                  </div>
                </div>
                {/* categories box */}
                <div className="col-12 col-sm-6 col-md-3 mb-3 mb-md-0">
                  <div className={classes.card}>
                    <div className={classes.cardHeader}>
                      <span>
                        <MdCategory />
                      </span>
                    </div>
                    <div className={classes.cardContent}>
                      <span className="me-2 fw-bold">
                        {fetchData?.categories?.length}
                      </span>
                      <span>Categories</span>
                    </div>
                  </div>
                </div>
                {/* admins box */}
                <div className="col-12 col-sm-6 col-md-3 mb-3 mb-md-0">
                  <div className={classes.card}>
                    <div className={classes.cardHeader}>
                      <span>
                        <FaUserLock />
                      </span>
                    </div>
                    <div className={classes.cardContent}>
                      <span className="me-2 fw-bold">
                        {fetchData?.admins?.length}
                      </span>
                      <span>Admins</span>
                    </div>
                  </div>
                </div>
                {/* opinions box */}
                <div className="col-12 col-sm-6 col-md-3">
                  <div className={classes.card}>
                    <div className={classes.cardHeader}>
                      <span>
                        <LiaThinkPeaks />
                      </span>
                    </div>
                    <div className={classes.cardContent}>
                      <span className="me-2 fw-bold">
                        {fetchData?.opinions?.length}
                      </span>
                      <span>Opinions</span>
                    </div>
                  </div>
                </div>
                {/* admins table */}
                <div className="col-12 col-md-7 mt-5">
                  <div className={classes.card}>
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                      <span className="fw-bold">Admins</span>
                      <button
                        onClick={() => setAddAdminModel(true)}
                        className="blacktoorange"
                      >
                        Add admin
                      </button>
                    </div>
                    <div className={classes.card}>
                      <AdminsTable
                        fetchData={fetchData}
                        setFetchData={setFetchData}
                      />
                    </div>
                  </div>
                </div>
                {/* data chart */}
                <div className="col-12 col-md-5 mt-5">
                  <div className={classes.card}>
                    <Rechart
                      carsNumber={fetchData?.cars?.length}
                      categoriesNumber={fetchData?.categories?.length}
                      adminsNumber={fetchData?.admins?.length}
                      opinionsNumber={fetchData?.opinions?.length}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading ? <Loading key={"loading"} /> : ""}
      {addAdminModel ? (
        <AddAdminModel
          key={"add_admin_model"}
          setAddAdminModel={setAddAdminModel}
          setFetchData={setFetchData}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default DashboardPage;
