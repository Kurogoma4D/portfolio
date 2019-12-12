import * as React from "react";
import Layout from "../../components/LayoutComp/Layout";
import { NextPage } from "next";
import * as style from "../../styles/works.scss";
import ImageHeader from "../../components/ImageHeader/ImageHeader";
import Link from "next/link";
import matter from "gray-matter";

type Posts = {
  document: matter.GrayMatterFile<any>;
  slug: string;
}[];

const WorksPage: NextPage = () => {
  const [posts, setPosts] = React.useState<Posts>([]);

  React.useEffect(() => {
    const postDatas = (context => {
      const keys = context.keys();
      const values = keys.map<any>(context);
      const data = keys.map((key, index) => {
        const slug = key
          .replace(/^.*[\\\/]/, "")
          .split(".")
          .slice(0, -1)
          .join(".");
        const value = values[index];
        const document = matter(value.default);
        return {
          document,
          slug
        };
      });
      return data;
    })(require.context("../../posts", true, /\.md$/));

    setPosts(postDatas);

    return () => {};
  }, [setPosts]);

  return (
    <Layout title="Works | Kurogoma4D">
      <ImageHeader
        imagePath={require("../images/about-header.webp")}
        text="作品"
      />
      <div className={style.contentsWrap}>
        {posts &&
          posts.map(post => (
            <div key={post.slug}>
              <Link href={`/works/${post.slug}`}>
                <a>
                  <div className={style.workCard}>
                    <img
                      src={post.document.data.image}
                      alt={post.document.data.title}
                    ></img>
                    <span className={style.workTitle}>
                      {post.document.data.title}
                    </span>
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
