import * as React from "react";
import { NextPage } from "next";
import * as style from "../../styles/workDetail.scss";
import axios from "axios";
import { Content } from "interfaces/Posts";
import { motion } from "framer-motion";
import ImageHeader from "../../components/ImageHeader/ImageHeader";

type Props = {
  post: Content;
};

const easeOut = [0, 0.95, 0.63, 0.99];

const WorkDetail: NextPage<Props> = (props: Props) => {
  const images: string[] = [];
  images.push(props.post.image_first || "");
  images.push(props.post.image_second || "");
  images.push(props.post.image_third || "");
  images.push(props.post.image_forth || "");

  const coverImageStyle = () => {
    let style: React.CSSProperties = {};
    if (props.post.cover_image) {
      style = {
        background: `#ffffff66 url(${props.post.cover_image.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      };
    }
    return style;
  };

  return (
    <>
      <ImageHeader
        imagePath="/static/images/works/cg_kirameki.png"
        text="作品"
      />{" "}
      <div className={style.contentsWrap}>
        <motion.div
          key="title"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: easeOut }}
          className={`${style.content} ${style.noPadding}`}
        >
          <h1 className={style.title} style={coverImageStyle()}>
            {props.post?.title ?? ""}
          </h1>
        </motion.div>
        <motion.div
          key="body"
          initial={{ y: "150%" }}
          animate={{ y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: easeOut }}
          className={style.content}
        >
          <p className={style.body}>{props.post?.body ?? ""}</p>
        </motion.div>
        <motion.div
          key="image"
          initial={{ y: "150%" }}
          animate={{ y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: easeOut }}
          className={style.content}
        >
          {images.map(
            imageUrl =>
              imageUrl !== "" && (
                <img
                  key={imageUrl}
                  src={imageUrl}
                  className={style.image}
                ></img>
              )
          )}
        </motion.div>
      </div>
    </>
  );
};

export default WorkDetail;

WorkDetail.getInitialProps = async ({ query }): Promise<Props> => {
  const { id } = query;
  const key = {
    headers: { "X-API-KEY": process.env.CMS_API_KEY }
  };
  const res = await axios.get<Content>(
    `https://krgm4d.microcms.io/api/v1/works/${id}`,
    key
  );

  return { post: res.data };
};
