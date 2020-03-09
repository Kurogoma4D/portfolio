import { Animation, Reveal } from "react-genie";
import * as style from "./SpotLight.scss";
import { CSSProperties } from "react";

type Props = {
  children: React.ReactNode;
  angle: number;
  invert: boolean;
  color?: string;
  size?: number;
  offset: number;
};

const SpotLight: React.FC<Props> = (props: Props) => {
  const lightStyle = (): CSSProperties => {
    const position = props.invert
      ? { left: `-${(props.size ?? 20) * 1.2}vw` }
      : { right: `-${(props.size ?? 20) * 1.2}vw` };
    const style = {
      top: `max(0vh, min(calc(${props.offset}vh - (100vw - 375px)), 40vh) )`,
      borderLeft: `${props.size ?? 20}vw solid transparent`,
      borderRight: `${props.size ?? 20}vw solid transparent`,
      borderRadius: `0 0 ${(props.size ?? 20) - 20}vw ${props.size ?? 20}vw`,
      borderBottom: `${(props.size ?? 20) * 5}vw solid ${props.color ??
        "rgba(231, 218, 174, 0.4)"}`,
      transform: `rotate(${props.angle}deg)`
    };
    return { ...style, ...position };
  };

  return (
    <div className={style.spotLightWrap}>
      {props.children}
      <Reveal delay={600} animation={Animation.FadeIn}>
        <div className={style.light} style={lightStyle()}></div>
      </Reveal>
    </div>
  );
};

export default SpotLight;
