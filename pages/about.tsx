import { NextPage } from "next";
import * as style from "../styles/about.scss";
import Layout from "../components/LayoutComp/Layout";
import ImageHeader from "../components/ImageHeader/ImageHeader";

const About: NextPage = () => {
  return (
    <Layout title="About | Kurogoma4D">
      <ImageHeader
        imagePath={require("./images/about-header.webp")}
        text="人"
      />
      <div className={style.personalContainer}>
        <img src={require("./images/profile.webp")} alt="アイコン" />
        <h2>Kurogoma4D</h2>
      </div>
      <div className={style.content}>
        <p>
          自主制作としてソフトウェア開発をしたり、3DCGで静止画を制作したりしている。高専生活の過程でX-R技術やデザインに興味を持ち、メディアデザインを対象とする研究室に所属する。現在はAR技術を用いたスマートフォンアプリとUser
          Interfaceに関する研究を続けている。
          <br />
          趣味はPCゲーム、ポータブルオーディオなど。
        </p>
        <h3>経歴</h3>
        <div className={style.carrier}>
          <p>2013/4~</p>
          <p>木更津工業高等専門学校 情報工学科</p>
          <p>2016/10~</p>
          <p>吉澤研究室(メディアデザイン実験室) 所属</p>
          <p>2018/4~</p>
          <p>木更津工業高等専門学校 制御・情報システム工学専攻</p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
