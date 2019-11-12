import * as React from "react";
import Link from "next/link";
import { NextPage } from "next";
import Layout from "../components/LayoutComp/Layout";
import Person from "./person";

const IndexPage: NextPage = () => {
  return (
    <Layout title="Kurogoma4D">
      <h1>Hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <Person />
    </Layout>
  );
};

export default IndexPage;
