import { Animation, Reveal } from "react-genie";
import * as style from "./SpotLight.scss";
import { CSSProperties } from "react";

type Props = {
  children: React.ReactNode;
  angle: number;
  invert: boolean;
  size?: number;
  offset: number;
};

const SpotLight: React.FC<Props> = (props: Props) => {
  const lightStyle = (): CSSProperties => {
    const position = props.invert
      ? { left: `-${(props.size ?? 20) * 1.2}vw` }
      : { right: `-${(props.size ?? 20) * 1.2}vw` };
    const style = {
      top: `max(-10vh, min(calc(${props.offset}vh - (100vw - 375px)), 40vh) )`,
      width: `${(props.size ?? 20) * 2}vw`,
      height: `${(props.size ?? 20) * 5}vw`,
      transform: `rotate(${props.angle}deg)`
    };
    return { ...style, ...position };
  };

  return (
    <div className={style.spotLightWrap}>
      {props.children}
      <Reveal delay={600} animation={Animation.FadeIn}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          style={lightStyle()}
          className={style.light}
        >
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop stopColor="rgb(255, 105, 102)" stopOpacity="0.4" />
              <stop offset="88%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M50 -100 L10 80 L90 80 Z" />
        </svg>
      </Reveal>
    </div>
  );
};

export default SpotLight;
