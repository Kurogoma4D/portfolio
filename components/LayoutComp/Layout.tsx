import * as React from "react";
import Link from "next/link";
import Head from "next/head";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import * as style from "./Layout.scss";
import { withRouter, NextRouter } from "next/router";
import { NextPage } from "next";
import { WithRouterProps } from "next/dist/client/with-router";

type Props = {
  children?: React.ReactNode;
  title?: string;
  router: NextRouter;
};

const Layout: NextPage<Props & WithRouterProps> = ({
  children,
  title = "title",
  router,
}) => {
  const [value, setValue] = React.useState("/");

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

  const menuItems = menuItemProps.map(item => (
    <Link href={item.linkTo} passHref>
      <BottomNavigationAction
        label={item.label}
        value={item.linkTo}
        showLabel={true}
      />
    </Link>
  ));

  React.useEffect(() => {
    if (router.pathname !== "/") {
      setValue(router.pathname);
    }
    return () => {
      console.log(value);
    };
  });

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header></header>
      {children}
      <footer>
        <BottomNavigation value={value} className={style.bottomNavigation}>
          {menuItems}
        </BottomNavigation>
      </footer>
    </div>
  );
};

export default withRouter(Layout);
