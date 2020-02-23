import * as React from "react";
import { NextPage } from "next";
import Layout from "../components/LayoutComp/Layout";
import * as style from "../styles/index.scss";
import AppContext from "../utils/AppContext";
import About from "../components/about/about";
import { ReactSVG } from "react-svg";
import Skills from "../components/skills/skills";

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

  const stageLine: React.ReactElement[] = [];
  for (var i = 0; i < 24; i++) {
    stageLine.push(<div className={style.stageLine} key={i} />);
  }

  const stars: React.ReactElement[] = [];

  const starPositionTop = (): number => {
    return Math.random() * (80 - 20) + 20;
  };

  const starPositionLeft = (): number => {
    return Math.random() * 100;
  };

  const blinkDuration = (): number => {
    return Math.random() * (12.0 - 2.6) + 2.6;
  };

  for (var i = 0; i < 12; i++) {
    var starStyle: React.CSSProperties = {
      position: "absolute",
      top: `${starPositionTop()}vh`,
      left: `${starPositionLeft()}%`,
      animation: `${blinkDuration()}s ease-out 5ms infinite normal star-blink`
    };
    stars.push(
      <ReactSVG
        style={starStyle}
        src={`/static/images/star${(i % 3) + 1}.svg`}
        className="home__star"
        beforeInjection={svg => {
          svg.setAttribute("fill", "#f1f08199");
        }}
        key={`s${i}`}
        wrapper="span"
      ></ReactSVG>
    );
  }

  return (
    <Layout title="Kurogoma4D">
      <div className={style.topWrapper}>
        <div className={style.stageTop} />
        <div className={style.spotlight} />
        <p className={style.quote + " quote--animation"}>
          It is never too late to be what you might have been.
          <span className={style.author}>George Eliot</span>
        </p>
        <div className={style.environment} />
        <div>{stars}</div>
        <div className={style.stage}>{stageLine}</div>
      </div>
      <About />
      <Skills />
      <style jsx global>{`
        .quote--animation {
          animation: 3s ease-in-out 50ms infinite alternate quote-move;
        }

        @keyframes star-blink {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          20% {
            transform: scale(0.6);
            opacity: 1;
          }

          60% {
            transform: scale(0.56);
            opacity: 0;
          }

          100% {
            transform: scale(0.56);
            opacity: 0;
          }
        }

        @keyframes quote-move {
          0% {
            transform: translate(-50%, 0) scale(1);
          }
          100% {
            transform: translate(-50%, -20px) scale(1.06);
          }
        }
      `}</style>
    </Layout>
  );
};

export default IndexPage;
