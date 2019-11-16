import * as React from "react";
import * as style from "./Header.scss";
import { Router, useRouter } from "next/router";
import AppContext from "../../utils/AppContext";
import { menuItemProps } from "../..//utils/menuItemProps";
import Link from "next/link";

const Header: React.FC = () => {
  const { state } = React.useContext(AppContext);
  const { pathname } = useRouter();

  React.useEffect(() => {
    function onChangeRoute() {
      state.setAppBarMode("light");
    }

    Router.events.on("routeChangeComplete", () => onChangeRoute());
    return () => {
      Router.events.off("routeChangeComplete", () => onChangeRoute());
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

  function getTitle() {
    var path = pathname.substring(1).toUpperCase();
    if (path === "") {
      path = "TOP";
    }
    return path;
  }

  const theme = appBarThemeSwitch();

  const title = getTitle();

  return (
    <div className={style.appBar} style={theme}>
      <h1 className={style.title}>{title}</h1>
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
