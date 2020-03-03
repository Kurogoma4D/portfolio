import * as React from "react";
import { NextPage } from "next";
import * as style from "../../styles/works.scss";
import axios from "axios";
import { Post, Content, Category } from "interfaces/Posts";
import { useState, useCallback } from "react";
import { Waypoint } from "react-waypoint";
import { motion } from "framer-motion";
import ImageHeader from "../../components/ImageHeader/ImageHeader";
import Link from "next/link";

type Props = {
  contents: Content[];
  categories: Category[];
  totalCount: number;
};

const transition = {
  duration: 0.4,
  ease: [0, 0.95, 0.63, 0.99]
};

const variants = {
  initial: {
    scale: 0,
    transition: transition
  },
  animate: {
    scale: 1,
    transition: transition
  },
  exit: {
    scale: 0,
    transition: transition
  }
};

const WorksPage: NextPage<Props> = (props: Props) => {
  const [posts, setPosts] = useState<Content[]>(props.contents);
  const [selectedCategory, setCategory] = useState<Object>(() => {
    let entries = {};
    props.categories.forEach(value => {
      entries[value.id] = true;
    });
    return entries;
  });

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
      headers: { "X-API-KEY": process.env.CMS_API_KEY },
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
    <>
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
              <motion.div key={content.id} variants={variants}>
                <Link href="/works/[id]" as={`/works/${content.id}`}>
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
              </motion.div>
            )
        )}
        <Waypoint onEnter={onReload}></Waypoint>
      </div>
    </>
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
