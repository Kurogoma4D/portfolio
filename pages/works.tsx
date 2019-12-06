import * as React from "react";
import Layout from "../components/LayoutComp/Layout";
import { NextPage } from "next";
import * as style from "../styles/works.scss";
import ImageHeader from "../components/ImageHeader/ImageHeader";

const WorksPage: NextPage = () => (
  <Layout title="Works | Kurogoma4D">
    <ImageHeader
      imagePath={require("./images/about-header.webp")}
      text="作品"
    />
    <div className={style.contentsWrap}></div>
  </Layout>
);

export default WorksPage;
