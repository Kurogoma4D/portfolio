import { NextPage } from "next";
import * as React from "react";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";

type Props = {
  data: {
    [key: string]: any;
  };
  content: string;
};

const WorkDetail: NextPage<Props> = (props: Props) => {
  return (
    <>
      <p>{props.data.title}</p>
      <ReactMarkdown escapeHtml={false} source={props.content}></ReactMarkdown>
    </>
  );
};

export default WorkDetail;

WorkDetail.getInitialProps = async ({ query }): Promise<Props> => {
  const { slug } = query;
  const content = await require(`../../posts/${slug}.md`);
  const raw = matter(content.default);
  const datas = { ...raw };
  console.log(datas.content);

  return { data: datas.data, content: datas.content };
};
