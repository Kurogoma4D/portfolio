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

  const stageLine: React.ReactElement[] = [];
  for (var i = 0; i < 24; i++) {
    stageLine.push(<div className={style.stageLine} key={i} />);
  }

  return (
    <Layout title="Kurogoma4D">
      <div className={style.topWrapper}>
        <p className={style.quote}>
          It is never too late to be what you might have been.
        </p>
        <p className={style.author}>George Eliot</p>
        <div className={style.stageTop} />
        <div className={style.stage}>{stageLine}</div>
      </div>
      <About />
    </Layout>
  );
};

export default IndexPage;
