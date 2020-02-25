import * as React from "react";
import Layout from "../../components/LayoutComp/Layout";
import { NextPage } from "next";
import * as style from "../../styles/works.scss";
import ImageHeader from "../../components/ImageHeader/ImageHeader";
import axios from "axios";
import { Post, Content } from "interfaces/Posts";
import { useState } from "react";
import Popup from "reactjs-popup";
import WorkDetail from "../../components/workDetail/workDetail";

type Props = {
  contents: Content[];
  totalCount: number;
};

const WorksPage: NextPage<Props> = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentId, setCurrentId] = useState("");

  const handleModalOpen = (id: string): void => {
    setCurrentId(id);
    setIsOpen(true);
  };

  const handleModalClose = (): void => {
    setIsOpen(false);
  };

  const test = Array(100)
    .fill({})
    .map<Content>(() => ({
      id: Math.random().toString(),
      title: Math.random().toString()
    }));
  const [posts, setPosts] = useState<Content[]>(props.contents.concat(test));

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
        imagePath="/static/images/works/cg_kirameki.png"
        text="作品"
      />
      <button onClick={onReload}>reload</button>
      <div className={style.contentsWrap}>
        {posts.map(content => (
          <a key={content.id} onClick={() => handleModalOpen(content.id)}>
            <div className={style.workCard}>
              <img
                src={
                  content.cover_image?.url ?? "/static/images/no_image256.png"
                }
                alt={content.title}
              ></img>
              <span className={style.workTitle}>{content.title}</span>
            </div>
          </a>
        ))}
      </div>
      <Popup
        open={isOpen}
        closeOnDocumentClick
        onClose={handleModalClose}
        contentStyle={{
          width: "90%",
          height: "70%"
        }}
      >
        <WorkDetail id={currentId}></WorkDetail>
      </Popup>
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
