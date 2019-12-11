import * as React from "react";
import { NextPage } from "next";
import Layout from "../components/LayoutComp/Layout";
import * as style from "../styles/index.scss";
import AppContext from "../utils/AppContext";
import About from "./about";

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
      <div className={style.topWrapper}>
        <p className={style.quote}>
          It is never too late to be what you might have been.
        </p>
        <p className={style.author}>George Eliot</p>
        <p>工事中 なんか後ろにアニメーションとかいれたい</p>
      </div>
      <About />
    </Layout>
  );
};

export default IndexPage;
