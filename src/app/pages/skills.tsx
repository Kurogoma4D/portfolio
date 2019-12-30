import * as React from "react";
import { NextPage } from "next";
import * as style from "../styles/skills.scss";
import Layout from "../components/LayoutComp/Layout";
import ImageHeader from "../components/ImageHeader/ImageHeader";
import { regularSkills, poorSkills, designSkills } from "../utils/skillData";
import SkillPanel from "../components/SkillPanel/SkillPanel";

const SkillsPage: NextPage = () => (
  <Layout title="Skills | Kurogoma4D">
    <ImageHeader imagePath="/static/images/works/cg_kirameki.png" text="技術" />
    <div className={style.titleWrap}>
      <h2>プログラミング</h2>
      <h3>そこそこできる</h3>
    </div>
    <div className={style.panelsWrap}>
      {regularSkills.map(item => (
        <SkillPanel item={item} key={item.name}></SkillPanel>
      ))}
    </div>

    <div className={style.titleWrap}>
      <h2>プログラミング</h2>
      <h3>さわったことある</h3>
    </div>
    <div className={style.chipsWrap}>
      {poorSkills.map(item => (
        <p className={style.skillChip} key={item.name}>
          {item.name}
        </p>
      ))}
    </div>

    <div className={style.titleWrap}>
      <h2>デザイン</h2>
    </div>
    <div className={style.panelsWrap}>
      {designSkills.map(item => (
        <SkillPanel item={item} key={item.name}></SkillPanel>
      ))}
    </div>
  </Layout>
);

export default SkillsPage;
