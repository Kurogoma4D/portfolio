import * as React from "react";
import Link from "next/link";
import Layout from "../components/LayoutComp/Layout";
import { NextPage } from "next";
import * as style from "../styles/works.scss";

const WorksPage: NextPage = () => (
  <Layout title="Works | Kurogoma4D">
    <h1 className={style.title}>Works</h1>
    <p>This is the works page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
  </Layout>
);

export default WorksPage;
