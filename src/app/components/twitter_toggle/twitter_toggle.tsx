import * as React from "react";
import * as style from "./twitter_toggle.scss";

type Props = {
  isActive: boolean;
  itemId: string;
  onClick: (event: any) => void;
};

const TwitterToggle: React.FC<Props> = (props: Props) => {
  const { isActive, itemId, onClick } = props;

  const switchChipStyle = (isActive: boolean): string => {
    return isActive
      ? `${style.categoryChip} ${style.active}`
      : `${style.categoryChip}`;
  };

  return (
    <button
      key={itemId}
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
