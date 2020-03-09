import * as React from "react";
import { NextPage } from "next";
import * as style from "../styles/index.scss";
import About from "../components/about/about";
import Skills from "../components/skills/skills";
// import CreateCanvas from "../utils/create_canvas";
import Link from "next/link";
import { Reveal, Animation } from "react-genie";
import dynamic from "next/dynamic";

const FixedCanvas = dynamic(() => import("../utils/create_fixed_canvas"), {
  ssr: false
});

const IndexPage: NextPage = () => {
  return (
    <>
      <div className={style.backgroundWrapper}>
        <FixedCanvas />
      </div>
      {/* <div className={style.topWrapper}>
        <CreateCanvas />
      </div> */}
      <About />
      <Reveal animation={Animation.FadeInUp}>
        <div className={style.buttonWrap}>
          <Link href="/works">
            <a className={style.worksLink}>作品を見る</a>
          </Link>
        </div>
      </Reveal>
      <Skills />
    </>
  );
};

export default IndexPage;
