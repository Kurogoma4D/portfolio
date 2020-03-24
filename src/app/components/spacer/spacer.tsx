import * as style from "./spacer.scss";

type Props = {
  height: string;
};

export const Spacer: React.FC<Props> = (props: Props) => {
  return <div style={{ height: props.height }} className={style.spacer} />;
};
