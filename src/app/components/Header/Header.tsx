import * as React from "react";
import * as style from "./Header.scss";
import { Router } from "next/router";
import AppContext from "../../utils/AppContext";
import { menuItemProps } from "../../utils/menuItemProps";
import Link from "next/link";

const Header: React.FC = () => {
  const { state } = React.useContext(AppContext);

  React.useEffect(() => {
    function onChangeRoute(url: string) {
      if (url === "/") {
        state.setAppBarMode("dark");
      } else {
        state.setAppBarMode("light");
      }
    }

    Router.events.on("routeChangeComplete", url => onChangeRoute(url));
    return () => {
      Router.events.off("routeChangeComplete", url => onChangeRoute(url));
    };
  }, []);

  function appBarThemeSwitch(): React.CSSProperties {
    switch (state.appBarMode) {
      case "dark":
        return {
          background: "#242424",
          color: "#ffffff"
        };
      case "light":
        return {
          background: "#fffcf4",
          color: "rgba(32, 32, 32, 1)"
        };
      default:
        return {};
    }
  }

  const theme = appBarThemeSwitch();

  return (
    <div className={style.appBar} style={theme}>
      <Link href="/">
        <h1 className={style.title}>TOP</h1>
      </Link>
      <nav className={style.menuContainer}>
        {menuItemProps.map((item, index) => (
          <Link href={item.linkTo} key={index}>
            <a>{item.label}</a>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Header;
