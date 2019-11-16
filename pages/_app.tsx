import NextApp from "next/app";
import "../styles/global.scss";
import Header from "../components/Header/Header";
import AppContext from "../utils/AppContext";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

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

    library.add(fab, fas);

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
          <Header />
        </AppContext.Provider>
      </>
    );
  }
}

export default MyApp;
