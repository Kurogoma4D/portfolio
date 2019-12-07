import * as React from "react";
import Layout from "../../components/LayoutComp/Layout";
import { NextPage } from "next";
import * as style from "../../styles/works.scss";
import ImageHeader from "../../components/ImageHeader/ImageHeader";
import Link from "next/link";

const WorksPage: NextPage = () => (
  <Layout title="Works | Kurogoma4D">
    <ImageHeader
      imagePath={require("../images/about-header.webp")}
      text="作品"
    />
    <div className={style.contentsWrap}>
      <Link href="/works/sample">
        <a>here</a>
      </Link>
    </div>
  </Layout>
);

export default WorksPage;
