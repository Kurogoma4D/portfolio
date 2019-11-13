import * as React from "react";
import { NextPage } from "next";
import Layout from "../components/LayoutComp/Layout";
import * as style from "../styles/index.scss";

const IndexPage: NextPage = () => {
  return (
    <Layout title="Kurogoma4D">
      <div className={style.topWrapper}></div>
    </Layout>
  );
};

export default IndexPage;
