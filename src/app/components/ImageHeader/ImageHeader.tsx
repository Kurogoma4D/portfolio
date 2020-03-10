import * as React from "react";
import * as style from "./ImageHeader.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  imagePath: string;
  text: string;
};

const ImageHeader: React.FC<Props> = (props: Props) => {
  const { imagePath, text } = props;

  return (
    <>
      <div className={style.wrap}>
        <div className={style.headerWrap}>
          <img src={imagePath} loading="lazy" alt="ヘッダー"></img>
          <span>{text}</span>
        </div>
      </div>
      <Link href="/">
        <a className={style.homeWrap}>
          <FontAwesomeIcon
            className={style.home}
            icon={["fas", "home"]}
            size="2x"
          />
          <span className={style.homeDecoration}>HOME</span>
        </a>
      </Link>
    </>
  );
};

export default ImageHeader;
