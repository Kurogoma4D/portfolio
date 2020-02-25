import * as React from "react";
import Layout from "../../components/LayoutComp/Layout";
import { NextPage } from "next";
import * as style from "../../styles/works.scss";
import ImageHeader from "../../components/ImageHeader/ImageHeader";
import axios from "axios";
import { Post, Content, Category } from "interfaces/Posts";
import { useState, useCallback } from "react";
import Popup from "reactjs-popup";
import WorkDetail from "../../components/workDetail/workDetail";
import { Waypoint } from "react-waypoint";

type Props = {
  contents: Content[];
  categories: Category[];
  totalCount: number;
};

const WorksPage: NextPage<Props> = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentId, setCurrentId] = useState("");
  const [posts, setPosts] = useState<Content[]>(props.contents);
  const [selectedCategory, setCategory] = useState<Object>(() => {
    let entries = {};
    props.categories.forEach(value => {
      entries[value.id] = true;
    });
    return entries;
  });

  const handleModalOpen = (id: string): void => {
    setCurrentId(id);
    setIsOpen(true);
  };

  const handleModalClose = (): void => {
    setIsOpen(false);
  };

  const handleChipClicked = useCallback((id: string): void => {
    setCategory(selectedCategory => {
      const current = JSON.parse(JSON.stringify(selectedCategory));
      current[id] = !selectedCategory[id];
      return current;
    });
  }, []);

  const switchChipStyle = (isActive: boolean): string => {
    return isActive
      ? `${style.categoryChip} ${style.active}`
      : `${style.categoryChip}`;
  };

  const isActiveCategory = (categories: Category[]): boolean => {
    let isActive = false;
    categories.forEach(category => {
      if (selectedCategory[category.id]) isActive = true;
    });
    return isActive;
  };

  const onReload = async () => {
    const offset = posts.length;
    if (offset >= props.totalCount) {
      return;
    }
    const parameters = {
      headers: { "X-API-KEY": process.env.cms_api_key },
      params: {
        offset: offset,
        fields: "id,title,cover_image,category"
      }
    };
    await axios
      .get<Post>(`https://krgm4d.microcms.io/api/v1/works`, parameters)
      .then(res => {
        setPosts(posts.concat(res.data.contents as Content[]));
      });
  };

  return (
    <Layout title="Works | Kurogoma4D">
      <ImageHeader
        imagePath="/static/images/works/cg_kirameki.png"
        text="作品"
      />
      <div className={style.chipsWrap}>
        {props.categories.map(item => (
          <a
            key={item.id}
            onClick={() => handleChipClicked(item.id)}
            className={switchChipStyle(selectedCategory[item.id])}
          >
            <p>{item.name}</p>
          </a>
        ))}
      </div>
      <div className={style.contentsWrap}>
        {posts.map(
          content =>
            isActiveCategory(content.category) && (
              <a key={content.id} onClick={() => handleModalOpen(content.id)}>
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
            )
        )}
        <Waypoint onEnter={onReload}></Waypoint>
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

  const contents = await axios.get<Post>(
    `https://krgm4d.microcms.io/api/v1/works`,
    {
      params: {
        fields: "id,title,cover_image,category",
        limit: 1
      },
      ...key
    }
  );

  const categories = await axios.get<Post>(
    `https://krgm4d.microcms.io/api/v1/categories`,
    {
      ...key
    }
  );

  return {
    contents: contents.data.contents as Content[],
    categories: categories.data.contents as Category[],
    totalCount: contents.data.totalCount
  };
};
