import * as React from "react";
import * as style from "./Header.scss";
import Link from "next/link";
import { Router } from "next/dist/client/router";
import AppContext from "../../utils/AppContext";

type Props = {
  menuItem: { linkTo: string; label: string; labelEn: string }[];
};

const Header: React.FC<Props> = ({ menuItem }) => {
  const [isOpened, setIsOpened] = React.useState(false);
  const { state } = React.useContext(AppContext);

  React.useEffect(() => {
    Router.events.on("routeChangeStart", () => setIsOpened(false));
    Router.events.on("routeChangeComplete", () => state.setAppBarMode("light"));
    return () => {
      Router.events.off("routeChangeStart", () => setIsOpened(false));
      Router.events.off("routeChangeComplete", () =>
        state.setAppBarMode("light")
      );
    };
  }, [setIsOpened]);

  function handleClick() {
    setIsOpened(!isOpened);
  }

  function addOpenedStyle() {
    return isOpened ? " " + style.opened : "";
  }

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

  function iconThemeSwitch(): React.CSSProperties {
    switch (state.appBarMode) {
      case "dark":
        return {
          backgroundColor: "#ffffff"
        };
      case "light":
        return {
          backgroundColor: "rgba(32, 32, 32, 0.6)"
        };
      default:
        return {};
    }
  }

  function buildMenu() {
    return (
      <div className={style.menuList}>
        {menuItem.map((item, index) => (
          <Link href={item.linkTo} key={index} passHref>
            <a className={style.navigation + addOpenedStyle()}>
              {item.label}
              <span className={style.ruby}> {item.labelEn}</span>
            </a>
          </Link>
        ))}
      </div>
    );
  }

  const theme = appBarThemeSwitch();
  const iconTheme = iconThemeSwitch();

  return (
    <>
      <nav className={style.menu + addOpenedStyle()}>{buildMenu()}</nav>
      <div className={style.appBar + addOpenedStyle()} style={theme}>
        <div
          className={style.menuIcon + addOpenedStyle()}
          onClick={handleClick}
        >
          <span style={iconTheme} />
          <span style={iconTheme} />
          <span style={iconTheme} />
        </div>
        <span className={style.title + addOpenedStyle()}>HOGE</span>
      </div>
    </>
  );
};

export default Header;
