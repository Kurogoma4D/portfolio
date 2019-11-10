import * as React from "react";
// import Link from "next/link";
import Head from "next/head";
import { NextPage } from "next";

import BottomFloatingMenu from "../BottomFloatingMenu/BottomFloatingMenu";

type Props = {
  children?: React.ReactNode;
  title?: string;
};

const Layout: NextPage<Props> = ({ children, title = "title" }) => {
  const menuItemProps = [
    {
      linkTo: "/works",
      label: "作品",
    },
    {
      linkTo: "/person",
      label: "人",
    },
    {
      linkTo: "/skills",
      label: "技術",
    },
  ];

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header></header>
      {children}
      <BottomFloatingMenu menuItem={menuItemProps} />
      <footer></footer>
    </div>
  );
};

export default Layout;
