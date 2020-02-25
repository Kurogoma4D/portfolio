import NextApp from "next/app";
import "../styles/global.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faHome } from "@fortawesome/free-solid-svg-icons";
import { RevealGlobalStyles } from "react-genie";

class MyApp extends NextApp {
  render() {
    const { Component, pageProps } = this.props;

    library.add(faTwitter, faEnvelope, faGithub, faHome);

    return (
      <>
        <RevealGlobalStyles />
        <Component {...pageProps} />
      </>
    );
  }
}

export default MyApp;
