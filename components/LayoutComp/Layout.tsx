import * as React from "react";
import Link from "next/link";
import Head from "next/head";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import * as style from "./Layout.scss";

type Props = {
  children?: React.ReactNode;
  title?: string;
};

const Layout: React.FC<Props> = ({ children, title = "title" }) => {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event: any, newValue: string) => {
    console.log(event.value);
    setValue(newValue);
  };

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
        <BottomNavigation
          value={value}
          onChange={handleChange}
          className={style.bottomNavigation}
        >
          <Link href="/works" passHref>
            <BottomNavigationAction label="作品" showLabel={true} />
          </Link>
          <Link href="/person" passHref>
            <BottomNavigationAction label="人" showLabel={true} />
          </Link>
          <BottomNavigationAction label="技術" showLabel={true} />
        </BottomNavigation>
      </footer>
    </div>
  );
};

export default Layout;
