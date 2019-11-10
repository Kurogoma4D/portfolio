import * as React from "react";
import * as style from "./BottomFloatingMenu.scss";
import Link from "next/link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
// import Divider from '@material-ui/core/Divider';

type Props = {
  menuItem: { linkTo: string; label: string }[];
};

const BottomFloatingMenu: React.FC<Props> = ({ menuItem }) => {
  const [isOpened, setIsOpened] = React.useState(false);

  function handleClick() {
    setIsOpened(!isOpened);
  }

  function addOpenedStyle() {
    return isOpened ? " " + style.opened : "";
  }

  function buildMenu() {
    if (isOpened) {
      return (
        <List component="nav">
          {menuItem.map(item => (
            <ListItem button divider>
              <Link href={item.linkTo} passHref>
                <ListItemText primary={item.label} />
              </Link>
            </ListItem>
          ))}
        </List>
      );
    } else {
      return <></>;
    }
  }

  return (
    <>
      <div className={style.background + addOpenedStyle()}></div>
      <div className={style.menuWrap + addOpenedStyle()}>
        <div className={style.menu + addOpenedStyle()}>
          <div className={style.listWrap + addOpenedStyle()}>{buildMenu()}</div>
          <div
            className={style.menuIcon + addOpenedStyle()}
            onClick={handleClick}
          >
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomFloatingMenu;
