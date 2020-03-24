import * as React from "react";
import * as style from "./twitter_toggle.scss";
import { Category } from "../../interfaces/posts";

type Props = {
  isActive: boolean;
  item: Category;
  onClick: (event: any) => void;
};

const TwitterToggle: React.FC<Props> = (props: Props) => {
  const { isActive, item, onClick } = props;

  const switchChipStyle = (isActive: boolean): string => {
    return isActive
      ? `${style.categoryChip} ${style.active}`
      : `${style.categoryChip}`;
  };

  return (
    <button
      key={item.id}
      onClick={onClick}
      className={switchChipStyle(isActive)}
    >
      <div className={style.switch}></div>
      <span>Twitter</span>
      <span>Other</span>
    </button>
  );
};

export default TwitterToggle;
