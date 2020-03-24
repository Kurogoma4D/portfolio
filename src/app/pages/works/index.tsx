import * as React from "react";
import { NextPage } from "next";
import * as style from "../../styles/works.scss";
import axios from "axios";
import { Post, Content, Category } from "interfaces/posts";
import { useState, useCallback } from "react";
import { Waypoint } from "react-waypoint";
import { motion } from "framer-motion";
import ImageHeader from "../../components/image_header/image_header";
import Link from "next/link";
import TwitterToggle from "../../components/twitter_toggle/twitter_toggle";

type Props = {
  contents: Content[];
  categories: Category[];
  totalCount: number;
  twitterCategoryId: string;
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
  const { contents, categories, totalCount, twitterCategoryId } = props;

  const [posts, setPosts] = useState<Content[]>(contents);
  const [selectedCategory, setCategory] = useState<Object>(() => {
    let entries = {};
    categories.forEach(value => {
      value.id === twitterCategoryId
        ? (entries[value.id] = false)
        : (entries[value.id] = true);
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
    let isTwitter = false;
    categories.forEach(category => {
      if (category.name === "twitter") {
        isTwitter = true;
      } else if (selectedCategory[category.id]) {
        isActive = true;
      }
    });

    if (isTwitter) {
      return isActive && selectedCategory[twitterCategoryId];
    } else {
      return isActive && !selectedCategory[twitterCategoryId];
    }
  };

  const onReload = async () => {
    const offset = posts.length;
    if (offset >= totalCount) {
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
      <TwitterToggle
        isActive={selectedCategory[categories[0].id]}
        onClick={() => handleChipClicked(categories[0].id)}
        itemId={categories[0].id}
      ></TwitterToggle>
      <div className={style.chipsWrap}>
        {categories.slice(1).map(item => (
          <button
            key={item.id}
            onClick={() => handleChipClicked(item.id)}
            className={switchChipStyle(selectedCategory[item.id])}
          >
            {item.name}
          </button>
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
                        loading="lazy"
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
        fields: "id,title,cover_image,category"
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

  const categoriesData = categories.data.contents as Category[];
  const twitter = categoriesData.find(category => category.name === "twitter")!;
  const twitterIndex = categoriesData.findIndex(
    category => category.name === "twitter"
  )!;

  categoriesData.splice(twitterIndex);
  categoriesData.unshift(twitter);

  return {
    contents: contents.data.contents as Content[],
    categories: categoriesData,
    totalCount: contents.data.totalCount,
    twitterCategoryId: twitter.id
  };
};
