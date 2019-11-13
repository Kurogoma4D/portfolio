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
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css?family=M+PLUS+1p:400,700&display=swap&subset=japanese"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c:300,700&display=swap&subset=japanese"
          rel="stylesheet"
        ></link>
      </Head>
      <header></header>
      <div className={style.spacer}>{children}</div>

      <footer></footer>
    </div>
  );
};

export default Layout;
