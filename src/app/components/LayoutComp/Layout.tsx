import * as React from "react";
import Head from "next/head";
import { NextPage } from "next";

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
      {children}

      <footer>
        <p>Favicon made by Freepik from www.flaticon.com</p>
      </footer>
    </div>
  );
};

export default Layout;
