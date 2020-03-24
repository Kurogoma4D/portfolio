import * as style from "./skill_panel.scss";
import { SkillItem } from "../../utils/skill_data";

type Props = {
  item: SkillItem;
  key?: string;
};

const SkillPanel: React.SFC<Props> = (props: Props) => {
  const { item } = props;
  return (
    <div className={style.panel}>
      <p className={style.name}>{item.name}</p>
      {item.relation && (
        <>
          <span className={style.relation}>キーワード：</span>
          <span className={style.relation}>{item.relation}</span>
        </>
      )}
      {item.description && (
        <p className={style.description}>{item.description}</p>
      )}
    </div>
  );
};

export default SkillPanel;
