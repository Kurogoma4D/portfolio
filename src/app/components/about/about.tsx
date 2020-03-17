import { NextPage } from "next";
import * as style from "./about.scss";
import axios from "axios";
import { GitHubEvents, Type } from "../../interfaces/GitHubEvents";
import * as React from "react";
import { normalizeNumber, scaleNumber } from "../../utils/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Spacer } from "../../components/spacer/spacer";

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

const commitSizeStyle = (size: number): React.CSSProperties => {
  const rangedSize = normalizeNumber(1, 10, Math.min(size, 10));
  const fontSize = scaleNumber(1.0, 2.0, rangedSize);
  return {
    fontSize: fontSize + "em"
  };
};

const parseRepoUrl = (url: string): string => {
  return url.replace("api.", "").replace("/repos", "");
};

const About: NextPage = () => {
  const [events, setEvents] = React.useState<GitHubEvents[]>([]);

  React.useEffect(() => {
    const getEvents = async () => {
      const eventsUrl = "https://api.github.com/users/Kurogoma4D/events";
      const response = await axios.get<GitHubEvents[]>(eventsUrl);
      const pushEvents = response.data.filter(
        item => item.type === Type.PushEvent
      );
      setEvents(pushEvents.slice(0, 3));
    };
    getEvents();
    return () => {};
  }, []);

  return (
    <>
      <Spacer height="40vh" />
      <div id="person" className={style.personalContainer}>
        <img src="/static/images/profile.jpg" loading="lazy" alt="アイコン" />
        <h2>Kurogoma4D | Suzuki Takafumi</h2>
        <div className={style.contacts}>
          <div className={style.contactLink}>
            <a href="https://twitter.com/Krgm4D">
              <FontAwesomeIcon
                icon={["fab", "twitter"]}
                size="lg"
                className={style.contactIcon}
              />
            </a>
            <a href="mailto:contact&#64;krgm4d.dev">
              <FontAwesomeIcon
                icon={["fas", "envelope"]}
                size="lg"
                className={style.contactIcon}
              />
            </a>
            <a href="https://github.com/Kurogoma4D">
              <FontAwesomeIcon
                icon={["fab", "github"]}
                size="lg"
                className={style.contactIcon}
              />
            </a>
          </div>
        </div>
      </div>
      <Spacer height="100vh" />
      <div id="bio" className={style.content}>
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
      </div>
      <Spacer height="100vh" />
      <div id="activity" className={style.activityWrap}>
        <h3 className={style.activityTitle}>最近の活動</h3>
        <div className={style.activityFlexWrap}>
          {events.map(event => (
            <div className={style.activityContainer} key={event.id}>
              <p className={style.activityDate}>
                {formatDate(event.created_at)}
              </p>
              <a
                href={parseRepoUrl(event.repo.url)}
                className={style.activityRepoName}
              >
                {event.repo.name}
              </a>
              <p className={style.activityCommit}>
                <span style={commitSizeStyle(event.payload.size as number)}>
                  {event.payload.size}
                </span>
                <span> コミット</span>
              </p>
            </div>
          ))}
        </div>
        <div className={style.buttonWrap}>
          <Link href="/works">
            <a className={style.worksLink}>作品を見る</a>
          </Link>
        </div>
      </div>
      <Spacer height="40vh" />
    </>
  );
};

export default About;
