import * as React from "react";
import * as style from "./ImageHeader.scss";

type Props = {
  imagePath: string;
  text: string;
};

const ImageHeader: React.FC<Props> = (props: Props) => {
  const { imagePath, text } = props;

  return (
    <div className={style.headerWrap}>
      <img src={imagePath} alt="ヘッダー"></img>
      <span>{text}</span>
    </div>
  );
};

export default ImageHeader;
