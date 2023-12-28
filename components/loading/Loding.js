import classes from "./loding.module.css";

const Loading = () => {
  return (
    <>
      <section className={classes.dotsContainer}>
        <div className={classes.dot}></div>
        <div className={classes.dot}></div>
        <div className={classes.dot}></div>
        <div className={classes.dot}></div>
        <div className={classes.dot}></div>
      </section>
    </>
  );
};

export default Loading;
