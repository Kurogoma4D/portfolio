import * as React from "react";
import { NextPage } from "next";
import { regularSkills, poorSkills, designSkills } from "../../utils/skillData";
import SkillPanel from "../SkillPanel/SkillPanel";
import * as style from "./skills.scss";
import { Reveal, Animation } from "react-genie";

const Skills: NextPage = () => (
  <>
    <Reveal animation={Animation.FadeInUp}>
      <div className={style.titleWrap}>
        <h2>プログラミング</h2>
        <h3>そこそこできる</h3>
      </div>
      <div className={style.panelsWrap}>
        {regularSkills.map(item => (
          <SkillPanel item={item} key={item.name}></SkillPanel>
        ))}
      </div>
    </Reveal>

    <Reveal animation={Animation.FadeInUp}>
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
    </Reveal>

    <Reveal animation={Animation.FadeInUp}>
      <div className={style.titleWrap}>
        <h2>デザイン</h2>
      </div>
      <div className={style.panelsWrap}>
        {designSkills.map(item => (
          <SkillPanel item={item} key={item.name}></SkillPanel>
        ))}
      </div>
    </Reveal>
  </>
);

export default Skills;
