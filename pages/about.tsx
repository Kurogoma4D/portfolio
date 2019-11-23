import { NextPage } from "next";
import * as style from "../styles/about.scss";
import Layout from "../components/LayoutComp/Layout";
import ImageHeader from "../components/ImageHeader/ImageHeader";
import axios from "axios";
import { GitHubEvents, Type } from "../interfaces/GitHubEvents";
import * as React from "react";

const About: NextPage = () => {
  const [events, setEvents] = React.useState<GitHubEvents[]>([]);

  React.useEffect(() => {
    const getEvents = async () => {
      const eventsUrl = "https://api.github.com/users/Kurogoma4D/events";
      const response = await axios.get<GitHubEvents[]>(eventsUrl);
      const pushEvents = response.data.filter(
        item => item.type === Type.PushEvent
      );
      setEvents(pushEvents);
    };
    getEvents();
    return () => {};
  }, []);

  const formatDate = (dateString: string): string => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
      timeZone: "Asia/Tokyo"
    };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("ja-JP", options).format(date);
  };

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
          自主制作として主にwebやアプリの開発をしたり、3DCGで静止画を制作したりしています。高専生活の過程でX-R技術やデザインに興味を持ち、メディアデザインを対象とする研究室に所属しました。
        </p>
        <p>
          エンジニアとして働く道を選んでいますが、将来は "UXエンジニア"
          を目指しています。そのために、開発をしつつ時間を見つけてはUXについてインプットをしたり考えたりしています。UXなんもわからん。
        </p>
        <p>趣味はPCゲーム、ポータブルオーディオなどです。音楽は世界を救う。</p>
        <h3>経歴</h3>
        <div className={style.carrier}>
          <p>2013/4~</p>
          <p>木更津工業高等専門学校 情報工学科</p>
          <p>2016/10~</p>
          <p>吉澤研究室(メディアデザイン実験室) 所属</p>
          <p>2018/4~</p>
          <p>木更津工業高等専門学校 制御・情報システム工学専攻</p>
        </div>
        <h3>最近の活動</h3>
        <div className={style.activityWrap}>
          {events.map(event => (
            <div className={style.activityContainer} key={event.id}>
              <p>{formatDate(event.created_at)}</p>
              <span>{event.payload.size}</span>
              <span>{event.repo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default About;
