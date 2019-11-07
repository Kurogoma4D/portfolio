import { NextPage } from "next";
import Layout from "../components/LayoutComp/Layout";
import * as style from "../styles/person.scss";
import ExpandButton from "../components/ExpandButton/ExpandButton";

const Person: NextPage = () => {
  const buttons = [
    "first",
    "second",
    "third",
    "forth",
    "fifth",
    "sixth",
    "seventh heaven",
  ];

  return (
    <Layout>
      <div className={style.wrap}>
        <div className={style.avatar}>
          <img src="https://www.gravatar.com/avatar/2a56039e69ff01ccaed212c455d06003" />
        </div>
        <h2 className={style.name}>Kurogoma4D</h2>
        <div className={style.flexContainer}>
          {buttons.map(text => {
            return (
              <>
                <ExpandButton text={text} />
                <div className={style.spacer} />
              </>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Person;
