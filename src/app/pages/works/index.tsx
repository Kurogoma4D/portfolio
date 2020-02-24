import * as React from "react";
import Layout from "../../components/LayoutComp/Layout";
import { NextPage } from "next";
import * as style from "../../styles/works.scss";
import ImageHeader from "../../components/ImageHeader/ImageHeader";
import axios from "axios";
import { Post, Content } from "interfaces/Posts";

type Props = {
  contents: Content[];
};

const WorksPage: NextPage<Props> = (props: Props) => {
  return (
    <Layout title="Works | Kurogoma4D">
      <ImageHeader
        imagePath="/static/images/works/gionfes_showcase.png"
        text="作品"
      />
      <div className={style.contentsWrap}>
        {props.contents.map(content => (
          <div key={content.id}>
            <p>{content.body}</p>
            <img src={content.image?.url} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default WorksPage;

WorksPage.getInitialProps = async (): Promise<Props> => {
  const key = {
    headers: { "X-API-KEY": process.env.CMS_API_KEY }
  };
  const res = await axios.get<Post>(
    `https://krgm4d.microcms.io/api/v1/works`,
    key
  );
  return { contents: res.data.contents };
};
