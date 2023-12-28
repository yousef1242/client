import { FaX } from "react-icons/fa6";
import classes from "./addAdminModel.module.css";
import { useState } from "react";
import request from "@/utils/request";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loading from "../loading/Loding";

const AddAdminModel = ({ setFetchData, setAddAdminModel }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { admin } = useSelector((state) => state.admin);

  //   add admin function
  const addAdminFunction = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "" || name.trim() === "") {
      return toast.error("The required field cannot be empty.");
    }
    setLoading(true);
    try {
      const formData = { name, email, password, isAdmin: true };
      const { data } = await request.post("/api/admins/add", formData, {
        headers: {
          Authorization: "bearer " + admin?.token,
        },
      });
      if (data.ok) {
        setLoading(false);
        toast.success(data.message);
        setAddAdminModel(false);
        setFetchData((prevData) => ({
          ...prevData,
          admins: [
            data.saveِAdmin, // Assuming formData is a new admin object
            ...prevData.admins,
          ],
        }));
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
      <div className={classes.addAdminModel}>
        <div className={classes.addAdminModelBox}>
          <div className={classes.addAdminModelBoxTop}>
            <span>Add admin</span>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setAddAdminModel(false)}
            >
              <FaX />
            </span>
          </div>
          <div className={classes.addAdminModelBoxBottom}>
            <form onSubmit={addAdminFunction}>
              <div className={classes.addAdminModelBoxFormGroup}>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="example"
                />
              </div>
              <div className={classes.addAdminModelBoxFormGroup}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="example@gmail.com"
                />
              </div>
              <div className={classes.addAdminModelBoxFormGroup}>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="............."
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

export default AddAdminModel;
