import { useState } from "react";
import classes from "./loginForm.module.css";
import toast from "react-hot-toast";
import request from "@/utils/request";
import Cookies from "js-cookie";
import Loading from "../loading/Loding";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { login } from "@/redux/adminSlice";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  //login form handler
  const loginFormHandler = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      return toast.error("The required field cannot be empty.");
    }
    setLoading(true);
    try {
      const { data } = await request.post("/api/admins/login", {
        email,
        password,
      });
      if (data.ok) {
        router.push("/dashboard");
        dispatch(
          login({
            id: data.id,
            name: data.name,
            token: data.token,
          })
        );
        Cookies.set(
          "adminInfo",
          JSON.stringify({
            id: data.id,
            name: data.name,
            token: data.token,
          })
        );
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div className={classes.loginForm}>
        <h4 className="mb-4 fw-bold">Login</h4>
        <form onSubmit={loginFormHandler}>
          <div className={classes.loginFormGroup}>
            <label htmlFor="email">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="example@gmail.com"
            />
          </div>
          <div className={classes.loginFormGroup}>
            <label htmlFor="password">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="............."
            />
          </div>
          <button className="orangetoblack">Welcome back!</button>
        </form>
      </div>
      {loading ? <Loading /> : ""}
    </>
  );
};

export default LoginForm;
