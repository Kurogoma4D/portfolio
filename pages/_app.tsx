import NextApp from "next/app";
import "../styles/global.scss";
import Header from "../components/Header/Header";

class MyApp extends NextApp {
  render() {
    const menuItemProps = [
      {
        linkTo: "/",
        label: "TOP",
        labelEn: ""
      },
      {
        linkTo: "/about",
        label: "人",
        labelEn: "about"
      },
      {
        linkTo: "/works",
        label: "作品",
        labelEn: "works"
      },
      {
        linkTo: "/skills",
        label: "技術",
        labelEn: "skill set"
      }
    ];

    const { Component } = this.props;
    return (
      <>
        <Component />
        <Header menuItem={menuItemProps} />
      </>
    );
  }
}

export default MyApp;
