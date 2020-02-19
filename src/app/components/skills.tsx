import * as React from "react";
import { NextPage } from "next";
import { regularSkills, poorSkills, designSkills } from "../utils/skillData";
import SkillPanel from "./SkillPanel/SkillPanel";

const SkillsPage: NextPage = () => (
  <>
    <div className="titleWrap">
      <h2>プログラミング</h2>
      <h3>そこそこできる</h3>
    </div>
    <div className="panelsWrap">
      {regularSkills.map(item => (
        <SkillPanel item={item} key={item.name}></SkillPanel>
      ))}
    </div>

    <div className="titleWrap">
      <h2>プログラミング</h2>
      <h3>さわったことある</h3>
    </div>
    <div className="chipsWrap">
      {poorSkills.map(item => (
        <p className="skillChip" key={item.name}>
          {item.name}
        </p>
      ))}
    </div>

    <div className="titleWrap">
      <h2>デザイン</h2>
    </div>
    <div className="panelsWrap">
      {designSkills.map(item => (
        <SkillPanel item={item} key={item.name}></SkillPanel>
      ))}
    </div>
    <style jsx>{`
      .titleWrap {
        margin: 40px 20px 20px;
        padding-bottom: 4px;
        border-bottom: solid 1px rgb(212, 212, 212);
      }

      .titleWrap h2 {
        display: inline;
      }

      .titleWrap h3 {
        display: inline;
        margin-left: 12px;
      }

      .panelsWrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
      }
      @media screen and (max-width: 900px) {
        .panelsWrap {
          justify-content: center;
        }
      }

      .chipsWrap {
        display: flex;
        flex-wrap: wrap;
        justify-content: start;
        margin: 0 10px;
      }

      .skillChip {
        padding: 4px 18px;
        font-size: larger;
        box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
        border-radius: 20px;
        font-family: "M PLUS Rounded 1c", sans-serif;
        font-weight: 700;
        background: rgba(207, 101, 101, 0.9);
        color: white;
        margin: 0 8px 18px;
      }
    `}</style>
  </>
);

export default SkillsPage;
