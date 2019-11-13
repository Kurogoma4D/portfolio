import * as React from "react";
import { NextPage } from "next";
import Layout from "../components/LayoutComp/Layout";
import * as style from "../styles/index.scss";
// import AppContext from "../utils/AppContext";

const IndexPage: NextPage = () => {
  // const { setAppBarColor } = React.useContext(AppContext);

  React.useEffect(() => {
    function handleScroll() {
      console.log(window.scrollY - 56 + " " + window.innerHeight);
    }
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Layout title="Kurogoma4D">
      <div className={style.topWrapper}></div>
      <div className={style.personWrapper}></div>
    </Layout>
  );
};

export default IndexPage;
