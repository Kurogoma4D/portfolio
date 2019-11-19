import * as React from "react";
import { NextPage } from "next";
import Layout from "../components/LayoutComp/Layout";
import * as style from "../styles/index.scss";
import AppContext from "../utils/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IndexPage: NextPage = () => {
  const { state } = React.useContext(AppContext);

  React.useEffect(() => {
    function handleScroll() {
      if (window.scrollY <= window.innerHeight) {
        state.setAppBarMode("dark");
      } else {
        state.setAppBarMode("light");
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Layout title="Kurogoma4D">
      <div className={style.topWrapper}>
        <p className={style.quote}>
          It is never too late to be what you might have been.
        </p>
        <p className={style.author}>George Eliot</p>
        <p>工事中 なんか後ろにアニメーションとかいれたい</p>
      </div>
      <div className={style.personWrapper}>
        <h2>話し合いましょう</h2>
        <div className={style.contactLink}>
          <a href="https://twitter.com/Krgm4D">
            <FontAwesomeIcon
              icon={["fab", "twitter"]}
              size="2x"
              className={style.twitter}
            />
            @Krgm4D
          </a>
        </div>
        <div className={style.contactLink}>
          <a href="mailto:contact&#64;krgm4d.dev">
            <FontAwesomeIcon
              icon={["fas", "envelope"]}
              size="2x"
              className={style.mail}
            />
            contact&#64;krgm4d.dev
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
