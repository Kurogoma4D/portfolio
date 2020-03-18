import * as React from "react";
import { NextPage } from "next";
import * as style from "../styles/index.scss";
import About from "../components/about/about";
import Skills from "../components/skills/skills";
import dynamic from "next/dynamic";

const FixedCanvas = dynamic(() => import("../utils/create_fixed_canvas"), {
  ssr: false
});

const IndexPage: NextPage = () => {
  return (
    <>
      <About />
      <Skills />
      <div className={style.backgroundWrapper}>
        <FixedCanvas />
      </div>
    </>
  );
};

export default IndexPage;
