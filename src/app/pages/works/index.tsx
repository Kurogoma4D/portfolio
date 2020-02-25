import * as React from "react";
import Layout from "../../components/LayoutComp/Layout";
import { NextPage } from "next";
import * as style from "../../styles/works.scss";
import ImageHeader from "../../components/ImageHeader/ImageHeader";
import axios from "axios";
import { Post, Content } from "interfaces/Posts";
import { useState } from "react";
import Link from "next/link";

type Props = {
  contents: Content[];
  totalCount: number;
};

const WorksPage: NextPage<Props> = (props: Props) => {
  const [posts, setPosts] = useState<Content[]>(props.contents);

  const onReload = async () => {
    const offset = posts.length;
    if (offset >= props.totalCount) {
      return;
    }
    const key = {
      headers: { "X-API-KEY": process.env.cms_api_key }
    };
    await axios
      .get<Post>(
        `https://krgm4d.microcms.io/api/v1/works?offset=${offset}&fields=id,title,cover_image`,
        key
      )
      .then(res => {
        setPosts(posts.concat(res.data.contents));
      });
  };

  return (
    <Layout title="Works | Kurogoma4D">
      <ImageHeader
        imagePath="/static/images/works/gionfes_showcase.png"
        text="作品"
      />
      <button onClick={onReload}>reload</button>
      <div className={style.contentsWrap}>
        {posts.map(content => (
          <div key={content.id}>
            <Link href={`/works/${content.id}`}>
              <a>
                <div className={style.workCard}>
                  <img
                    src={
                      content.cover_image?.url ??
                      "/static/images/no_image256.png"
                    }
                    alt={content.title}
                  ></img>
                  <span className={style.workTitle}>{content.title}</span>
                </div>
              </a>
            </Link>
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
    `https://krgm4d.microcms.io/api/v1/works?fields=id,title,cover_image`,
    key
  );
  return { contents: res.data.contents, totalCount: res.data.totalCount };
};
