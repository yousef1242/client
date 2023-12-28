import { MdDelete } from "react-icons/md";
import classes from "./opinionsBoxes.module.css";
import { useSelector } from "react-redux";
import Loading from "../loading/Loding";
import toast from "react-hot-toast";
import { useState } from "react";
import request from "@/utils/request";

const OpinionsBoxes = ({ opinionsData, setOpinionsData }) => {
  const [loading, setLoading] = useState(false);
  const { admin } = useSelector((state) => state.admin);

  // delete opinion function
  const deleteOpinionFunction = async (opinionId) => {
    if (opinionId) {
      setLoading(true);
      try {
        const { data } = await request.delete(
          `/api/opinions/delete/${opinionId}`,
          {
            headers: {
              Authorization: "bearer " + admin?.token,
            },
          }
        );
        if (data.ok) {
          toast.success(data.message);
          setLoading(false);
          const updatedAdmins = opinionsData?.filter(
            (opinion) => opinion._id !== opinionId
          );
          setOpinionsData(updatedAdmins);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message);
        }
      }
    } else {
      toast.error("Somthing went wrong");
    }
  };

  return (
    <>
      <div className={classes.opinionsData}>
        <div className="row">
          {opinionsData?.map((opinion) => (
            <div className="col-6 col-md-4 col-lg-3 mb-3">
              <div className={classes.card}>
                <h4 className="mb-4 fw-bold text-capitalize">
                  {opinion?.name}
                </h4>
                <p>{opinion?.message}</p>
                <div className="d-flex align-items-center justify-content-center">
                  <span
                    onClick={() => deleteOpinionFunction(opinion?._id)}
                    className="d-flex align-items-center justify-content-center text-white"
                    style={{
                      width: "30px",
                      height: "30px",
                      background: "var(--orange)",
                      cursor: "pointer",
                      borderRadius: "50%",
                    }}
                  >
                    <MdDelete />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {loading ? <Loading /> : ""}
    </>
  );
};

export default OpinionsBoxes;
