import * as React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import { NextPage } from "next";
import PageContainer from "../components/PageContainer";
import * as style from "../styles/works.scss";

const WorksPage: NextPage = () => (
  <Layout title="Works | Kurogoma4D">
    <PageContainer>
      <h1 className={style.title}>Works</h1>
      <p>This is the works page</p>
      <p>
        <Link href="/">
          <a>Go home</a>
        </Link>
      </p>
    </PageContainer>
  </Layout>
);

export default WorksPage;
