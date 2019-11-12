import * as React from "react";
import Link from "next/link";
import Layout from "../components/LayoutComp/Layout";
import { CSSProperties } from "@material-ui/styles";

const style: CSSProperties = {
  width: "100%",
  height: "900px",
  background: "#225522",
};

const AboutPage: React.FunctionComponent = () => (
  <Layout title="About | Next.js + TypeScript Example">
    <h1>About</h1>
    <p>This is the about page</p>
    <p>
      <Link href="/">
        <a>Go home</a>
      </Link>
    </p>
    <div style={style}></div>
  </Layout>
);

export default AboutPage;
