import { FaX } from "react-icons/fa6";
import classes from "./addOpinionModel.module.css";
import { useState } from "react";
import request from "@/utils/request";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loading from "../loading/Loding";

const AddOpinionModel = ({ setOpinionsData, setAddOpinionModel }) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { admin } = useSelector((state) => state.admin);

  // add category function
  const addOpinionFunction = async (e) => {
    e.preventDefault();
    if (name.trim() === "" || message.trim() === "") {
      return toast.error("The required field cannot be empty.");
    }
    setLoading(true);
    try {
      const formData = { name, message };
      const { data } = await request.post("/api/opinions/add", formData, {
        headers: {
          Authorization: "bearer " + admin?.token,
        },
      });
      if (data.ok) {
        setLoading(false);
        toast.success(data.message);
        setAddOpinionModel(false);
        setOpinionsData((prevData) => [data.saveopinion, ...prevData]);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      }
    }
  };

  return (
    <>
      <div className={classes.addOpinionModel}>
        <div className={classes.addOpinionModelBox}>
          <div className={classes.addOpinionModelBoxTop}>
            <span>Add opinion</span>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setAddOpinionModel(false)}
            >
              <FaX />
            </span>
          </div>
          <div className={classes.addOpinionModelBoxBottom}>
            <form onSubmit={addOpinionFunction}>
              <div className={classes.addOpinionModelBoxFormGroup}>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="example"
                />
              </div>
              <div className={classes.addOpinionModelBoxFormGroup}>
                <label htmlFor="message">Message</label>
                <textarea id="message" onChange={(e) => setMessage(e.target.value)}></textarea>
              </div>
              <button className="orangetoblack w-100">Add</button>
            </form>
          </div>
        </div>
      </div>
      {loading ? <Loading /> : ""}
    </>
  );
};

export default AddOpinionModel;
