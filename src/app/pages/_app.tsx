import NextApp from "next/app";
import "../styles/global.scss";
import Header from "../components/Header/Header";
import AppContext from "../utils/AppContext";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

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
    const { Component, pageProps } = this.props;

    library.add(faTwitter, faEnvelope);

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
          <Component {...pageProps} />
          <Header />
        </AppContext.Provider>
      </>
    );
  }
}

export default MyApp;
