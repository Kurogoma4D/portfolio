import NextApp from "next/app";
import "../styles/global.scss";
import Header from "../components/Header/Header";
import { menuItemProps } from "../utils/menuItemProps";
import AppContext from "../utils/AppContext";

class MyApp extends NextApp {
  state = {
    appBarMode: "dark",
    appBarColor: "#fffcf4"
  };

  setAppBarColor = (color: string) => {
    this.setState({ appBarColor: color });
  };

  render() {
    const { Component } = this.props;
    return (
      <>
        <AppContext.Provider
          value={{
            appBarColor: this.state.appBarColor,
            setAppBarColor: this.setAppBarColor,
            appBarMode: this.state.appBarMode
          }}
        >
          <Component />
          <Header menuItem={menuItemProps} />
        </AppContext.Provider>
      </>
    );
  }
}

export default MyApp;
