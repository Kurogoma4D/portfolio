import * as React from "react";
import * as style from "./ExpandButton.scss";

type Props = {
  text?: string;
};

const ExpandButton: React.FC<Props> = (props: Props) => {
  const { text } = props;

  const [isOpened, setOpened] = React.useState<boolean>(false);

  function buttonClass() {
    const base = style.expandButton;
    return base + (isOpened ? " " + style.opened : "");
  }

  return (
    <div className={buttonClass()} onClick={() => setOpened(!isOpened)}>
      <p>{text}</p>
    </div>
  );
};

export default ExpandButton;
