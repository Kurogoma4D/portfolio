import { NextPage } from "next";
import * as React from "react";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import * as style from "../../styles/workDetail.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

type Props = {
  data: {
    [key: string]: any;
  };
  content: string;
};

const WorkDetail: NextPage<Props> = (props: Props) => {
  return (
    <div className={style.contentsWrap}>
      <section className={style.header}>
        <Link href="/works">
          <a className={style.back}>
            <FontAwesomeIcon icon={["fas", "arrow-left"]} size="2x" />
            <span>戻る</span>
          </a>
        </Link>
      </section>
      <div className={style.coverImage}>
        <img src={props.data.image} alt={props.data.title}></img>
      </div>
      <section className={style.description}>
        <ReactMarkdown
          escapeHtml={false}
          source={props.content}
        ></ReactMarkdown>
      </section>
    </div>
  );
};

export default WorkDetail;

WorkDetail.getInitialProps = async ({ query }): Promise<Props> => {
  const { slug } = query;
  const content = await import(`../../posts/${slug}.md`);
  const raw = matter(content.default);
  const datas = { ...raw };

  return { data: datas.data, content: datas.content };
};
