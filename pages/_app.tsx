import NextApp from "next/app";
import "../styles/global.scss";
import Header from "../components/Header/Header";
import { menuItemProps } from "../utils/menuItemProps";

class MyApp extends NextApp {
  render() {
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
