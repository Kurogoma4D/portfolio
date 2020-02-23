import * as React from "react";
import { NextPage } from "next";
import Layout from "../components/LayoutComp/Layout";
import * as style from "../styles/index.scss";
import About from "../components/about/about";
import Skills from "../components/skills/skills";
import CreateCanvas from "../utils/create_canvas";
import CreateFixedCanvas from "../utils/create_fixed_canvas";

const IndexPage: NextPage = () => {
  return (
    <Layout title="Kurogoma4D">
      <div className={style.backgroundWrapper}>
        <CreateFixedCanvas />
      </div>
      <div className={style.topWrapper}>
        <CreateCanvas />
      </div>
      <About />
      <Skills />
    </Layout>
  );
};

export default IndexPage;
