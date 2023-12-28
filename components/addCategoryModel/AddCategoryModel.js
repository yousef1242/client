import { FaX } from "react-icons/fa6";
import classes from "./addCategoryModel.module.css";
import { useState } from "react";
import request from "@/utils/request";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loading from "../loading/Loding";

const AddCategoryModel = ({ setCategoriesData, setAddCategoryModel }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { admin } = useSelector((state) => state.admin);

  // add category function
  const addCategoryFunction = async (e) => {
    e.preventDefault();
    if (title.trim() === "") {
      return toast.error("The required field cannot be empty.");
    }
    setLoading(true);
    try {
      const formData = { title };
      const { data } = await request.post("/api/categories/add", formData, {
        headers: {
          Authorization: "bearer " + admin?.token,
        },
      });
      if (data.ok) {
        setLoading(false);
        toast.success(data.message);
        setAddCategoryModel(false);
        setCategoriesData((prevData) => [data.saveCategory, ...prevData]);
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
      <div className={classes.addCategoryModel}>
        <div className={classes.addCategoryModelBox}>
          <div className={classes.addCategoryModelBoxTop}>
            <span>Add category</span>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setAddCategoryModel(false)}
            >
              <FaX />
            </span>
          </div>
          <div className={classes.addCategoryModelBoxBottom}>
            <form onSubmit={addCategoryFunction}>
              <div className={classes.addCategoryModelBoxFormGroup}>
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="example"
                />
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

export default AddCategoryModel;
