import * as React from "react";
// import Link from "next/link";
import Head from "next/head";
import { NextPage } from "next";
import * as style from "./Layout.scss";

type Props = {
  children?: React.ReactNode;
  title?: string;
};

const Layout: NextPage<Props> = ({ children, title = "title" }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <header></header>
      <div className={style.spacer}>{children}</div>

      <footer>
        <p>Favicon made by Freepik from www.flaticon.com</p>
      </footer>
    </div>
  );
};

export default Layout;
