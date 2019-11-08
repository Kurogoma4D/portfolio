import * as React from "react";
import Link from "next/link";
import { NextPage } from "next";
import * as style from "../styles/works.scss";

const SkillsPage: NextPage = () => (
  <>
    <h1 className={style.title}>Skills</h1>
    <p>This is the skills page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </>
);

export default SkillsPage;
