import * as React from "react";
import Link from "next/link";
import { NextPage } from "next";
import * as style from "../styles/works.scss";
import Layout from "../components/LayoutComp/Layout";

const SkillsPage: NextPage = () => (
  <Layout title="Skills | Kurogoma4D">
    <h1 className={style.title}>Skills</h1>
    <p>準備中…</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export default SkillsPage;
