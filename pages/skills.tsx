import * as React from "react";
import { NextPage } from "next";
import * as style from "../styles/skills.scss";
import Layout from "../components/LayoutComp/Layout";
import ImageHeader from "../components/ImageHeader/ImageHeader";
import { regularSkills, poorSkills, designSkills } from "../utils/skillData";
import SkillPanel from "../components/SkillPanel/SkillPanel";

const SkillsPage: NextPage = () => (
  <Layout title="Skills | Kurogoma4D">
    <ImageHeader
      imagePath={require("./images/about-header.webp")}
      text="技術"
    />
    <div className={style.titleWrap}>
      <h2>プログラミング</h2>
      <h3>そこそこできる</h3>
    </div>
    <div className={style.skillsWrap}>
      {regularSkills.map(item => (
        <SkillPanel item={item} key={item.name}></SkillPanel>
      ))}
    </div>

    <div className={style.titleWrap}>
      <h2>プログラミング</h2>
      <h3>さわったことある</h3>
    </div>
    <div className={style.skillsWrap}>
      {poorSkills.map(item => (
        <SkillPanel item={item} key={item.name}></SkillPanel>
      ))}
    </div>

    <div className={style.titleWrap}>
      <h2>デザイン</h2>
    </div>
    <div className={style.skillsWrap}>
      {designSkills.map(item => (
        <SkillPanel item={item} key={item.name}></SkillPanel>
      ))}
    </div>
  </Layout>
);

export default SkillsPage;
