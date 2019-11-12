import * as React from "react";
import * as style from "./Header.scss";
import Link from "next/link";
import { Router } from "next/dist/client/router";

type Props = {
  menuItem: { linkTo: string; label: string; labelEn: string }[];
};

const Header: React.FC<Props> = ({ menuItem }) => {
  const [isOpened, setIsOpened] = React.useState(false);

  React.useEffect(() => {
    Router.events.on("routeChangeStart", () => setIsOpened(false));
    return () => {
      Router.events.off("routeChangeStart", () => setIsOpened(false));
    };
  }, [setIsOpened]);

  function handleClick() {
    setIsOpened(!isOpened);
  }

  function addOpenedStyle() {
    return isOpened ? " " + style.opened : "";
  }

  function buildMenu() {
    return (
      <ul className={style.menuList}>
        {menuItem.map((item, index) => (
          <Link href={item.linkTo} key={index} passHref>
            <li className={style.navigation + addOpenedStyle()}>
              {item.label}
              <span className={style.ruby}> {item.labelEn}</span>
            </li>
          </Link>
        ))}
      </ul>
    );
  }

  return (
    <>
      <nav className={style.menu + addOpenedStyle()}>{buildMenu()}</nav>
      <div className={style.appBar + addOpenedStyle()}>
        <div
          className={style.menuIcon + addOpenedStyle()}
          onClick={handleClick}
        >
          <span />
          <span />
          <span />
        </div>
        <span className={style.title + addOpenedStyle()}>HOGE</span>
      </div>
    </>
  );
};

export default Header;
