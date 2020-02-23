import * as React from "react";
import { NextPage } from "next";
import Layout from "../components/LayoutComp/Layout";
import * as style from "../styles/index.scss";
import AppContext from "../utils/AppContext";
import About from "../components/about/about";
import Skills from "../components/skills/skills";

const IndexPage: NextPage = () => {
  const { state } = React.useContext(AppContext);

  React.useEffect(() => {
    function handleScroll() {
      if (window.scrollY <= window.innerHeight) {
        state.setAppBarMode("dark");
      } else {
        state.setAppBarMode("light");
      }
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
      <About />
      <Skills />
    </Layout>
  );
};

export default IndexPage;
