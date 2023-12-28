import DashboardSidebar from "@/components/dashboardSidebar/DashboardSidebar";
import Head from "next/head";
import classes from "../dashboard.module.css";
import { useRouter } from "next/router";
import request from "@/utils/request";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "@/components/loading/Loding";
import OpinionsBoxes from "@/components/opinionsBoxes/OpinionsBoxes";
import AddOpinionModel from "@/components/addOpinionModel/AddOpinionModel";

const OpinionsDashboardPage = () => {
  const [opinionsData, setOpinionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addOpinionModel, setAddOpinionModel] = useState(false);
  const { admin } = useSelector((state) => state.admin);
  const router = useRouter();

  // fetch opinions data
  useEffect(() => {
    const fetchOpinionsData = async () => {
      if (admin.token) {
        try {
          const { data } = await request.get("/api/opinions/get/all");
          if (data.ok) {
            setOpinionsData(data.data);
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
      <div className="OpinionsDashboardPage">
        <div className="row w-100">
          <div className="col-2">
            <DashboardSidebar />
          </div>
          <div className={`${classes.dashboardPageRightSection} col-10`}>
            <div className="container">
              <div className="mb-5 d-flex align-items-center justify-content-between">
                <h2 className="fw-bold">Opinions</h2>
                <button
                  className="blacktoorange"
                  onClick={() => setAddOpinionModel(true)}
                >
                  Add opinion
                </button>
              </div>
              {opinionsData?.length > 0 ? (
                  <OpinionsBoxes
                    setOpinionsData={setOpinionsData}
                    opinionsData={opinionsData}
                    key={"opinions data"}
                  />
              ) : (
                <h5 className="ms-3" style={{ color: "var(--gray)" }}>
                  No opinions
                </h5>
              )}
            </div>
          </div>
        </div>
      </div>
      {loading ? <Loading key={"loading"} /> : ""}
      {addOpinionModel ? (
        <AddOpinionModel
          key={"addOpinionModel"}
          setAddOpinionModel={setAddOpinionModel}
          setOpinionsData={setOpinionsData}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default OpinionsDashboardPage;
