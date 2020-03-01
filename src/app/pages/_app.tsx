import NextApp from "next/app";
import "../styles/global.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faHome } from "@fortawesome/free-solid-svg-icons";
import { RevealGlobalStyles } from "react-genie";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "../components/LayoutComp/Layout";

class MyApp extends NextApp {
  render() {
    const { Component, pageProps, router } = this.props;

    library.add(faTwitter, faEnvelope, faGithub, faHome);

    return (
      <Layout title="Kurogoma4D">
        <RevealGlobalStyles />
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key="index"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={{ exit: { transition: { staggerChildren: 0.1 } } }}
          >
            <Component {...pageProps} key={router.route} />
          </motion.div>
        </AnimatePresence>
      </Layout>
    );
  }
}

export default MyApp;
