import * as React from "react";
import { NextPage } from "next";
import * as style from "../styles/skills.scss";
import Layout from "../components/LayoutComp/Layout";
import ImageHeader from "../components/ImageHeader/ImageHeader";

const SkillsPage: NextPage = () => (
  <Layout title="Skills | Kurogoma4D">
    <ImageHeader
      imagePath={require("./images/about-header.webp")}
      text="技術"
    />
    <section className={style.skillContent}>
      <div className={style.titleWrap}>
        <h2>プログラミング</h2>
        <h3>そこそこできる</h3>
      </div>

      <div className={style.titleWrap}>
        <h2>プログラミング</h2>
        <h3>さわったことある</h3>
      </div>
      <div className={style.titleWrap}>
        <h2>デザイン</h2>
      </div>
    </section>
  </Layout>
);

export default SkillsPage;
