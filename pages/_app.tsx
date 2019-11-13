import NextApp from "next/app";
import "../styles/global.scss";
import Header from "../components/Header/Header";
import { menuItemProps } from "../utils/menuItemProps";
import AppContext from "../utils/AppContext";

class MyApp extends NextApp {
  state = {
    appBarMode: "dark"
  };

  setAppBarMode = (mode: string) => {
    if (this.state.appBarMode !== mode) {
      this.setState({ appBarMode: mode });
    }
  };

  render() {
    const { Component } = this.props;
    return (
      <>
        <AppContext.Provider
          value={{
            state: {
              appBarMode: this.state.appBarMode,
              setAppBarMode: this.setAppBarMode
            }
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
