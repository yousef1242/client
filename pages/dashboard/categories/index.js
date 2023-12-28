import DashboardSidebar from "@/components/dashboardSidebar/DashboardSidebar";
import Head from "next/head";
import classes from "../dashboard.module.css";
import { useRouter } from "next/router";
import request from "@/utils/request";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "@/components/loading/Loding";
import CategoriesTable from "@/components/categoriesTable/CategoriesTable";
import AddCategoryModel from "@/components/addCategoryModel/AddCategoryModel";

const CategoriesDashboardPage = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addCategoryModel, setAddCategoryModel] = useState(false);
  const { admin } = useSelector((state) => state.admin);
  const router = useRouter();

  // fetch categories data
  useEffect(() => {
    const fetchCategoriesData = async () => {
      if (admin.token) {
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
      } else {
        router.push("/");
      }
    };
    fetchCategoriesData();
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
      <div className="categoriesDashboardPage">
        <div className="row w-100">
          <div className="col-2">
            <DashboardSidebar />
          </div>
          <div className={`${classes.dashboardPageRightSection} col-10`}>
            <div className="container">
              <div className="mb-5 d-flex align-items-center justify-content-between">
                <h2 className="fw-bold">Categories</h2>
                <button
                  className="blacktoorange"
                  onClick={() => setAddCategoryModel(true)}
                >
                  Add category
                </button>
              </div>
              {categoriesData?.length > 0 ? (
                <div className={classes.card}>
                  <CategoriesTable
                    setCategoriesData={setCategoriesData}
                    categoriesData={categoriesData}
                  />
                </div>
              ) : (
                <h5 className="ms-3" style={{ color: "var(--gray)" }}>
                  No categories
                </h5>
              )}
            </div>
          </div>
        </div>
      </div>
      {loading ? <Loading key={"loading"} /> : ""}
      {addCategoryModel ? (
        <AddCategoryModel
          setAddCategoryModel={setAddCategoryModel}
          setCategoriesData={setCategoriesData}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default CategoriesDashboardPage;
