import Head from "next/head";
import classes from "./login.module.css";
import LoginForm from "@/components/loginForm/LoginForm";
import Link from "next/link";
import PageNameSection from "@/components/pageNameSection/PageNameSection";

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className={classes.loginPage}>
        <PageNameSection
          key={"pageNameSection"}
          title={"Login"}
          links={[{name : "Home", to : "/"}, {name : "Login", to : "/login"}]}
        />
        <div className="container py-5 d-flex align-items-center justify-content-center">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
