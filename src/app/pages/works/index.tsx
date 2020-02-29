import * as React from "react";
import { NextPage } from "next";
import * as style from "../../styles/works.scss";
import axios from "axios";
import { Post, Content, Category } from "interfaces/Posts";
import { useState, useCallback } from "react";
import { Waypoint } from "react-waypoint";
import AnimatedLayout from "../../components/AnimatedLayout/AnimatedLayout";
import { motion } from "framer-motion";
import { useRouter } from "next/dist/client/router";

type Props = {
  contents: Content[];
  categories: Category[];
  totalCount: number;
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
  const router = useRouter();

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

  const variants = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1
    },
    exit: {
      opacity: 0
    }
  };
  return (
    <AnimatedLayout title="Works | Kurogoma4D">
      <motion.div
        key="index"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={{ exit: { transition: { staggerChildren: 0.1 } } }}
      >
        <div className={style.chipsWrap}>
          {props.categories.map(item => (
            <motion.div
              key={item.id}
              variants={variants}
              onTap={() => handleChipClicked(item.id)}
              className={switchChipStyle(selectedCategory[item.id])}
            >
              <p>{item.name}</p>
            </motion.div>
          ))}
        </div>
        <div className={style.contentsWrap}>
          {posts.map(
            content =>
              isActiveCategory(content.category) && (
                <motion.div
                  positionTransition
                  key={content.id}
                  variants={variants}
                  onTap={() => router.push(`/works/${content.id}`)}
                >
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
                </motion.div>
              )
          )}
          <Waypoint onEnter={onReload}></Waypoint>
        </div>
      </motion.div>
    </AnimatedLayout>
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
