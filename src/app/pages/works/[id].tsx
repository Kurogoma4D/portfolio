import * as React from "react";
import { NextPage } from "next";
import * as style from "../../styles/workDetail.scss";
import axios from "axios";
import { Content } from "interfaces/Posts";
import { motion } from "framer-motion";
import ImageHeader from "../../components/image_header/image_header";

type Props = {
  post: Content;
};

const easeOut = [0, 0.95, 0.63, 0.99];

const WorkDetail: NextPage<Props> = (props: Props) => {
  const { post } = props;

  const images: string[] = [];
  post.image_first && images.push(post.image_first);
  post.image_second && images.push(post.image_second);
  post.image_third && images.push(post.image_third);
  post.image_forth && images.push(post.image_forth);

  const coverImageStyle = () => {
    let style: React.CSSProperties = {
      color: "#424242"
    };
    if (post.cover_image) {
      style = {
        color: "#242424",
        background: `#ffffff66 url(${post.cover_image.url})`,
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
          className={`${style.content} ${style.noPadding} ${style.contentTop}`}
        >
          <h1 className={style.title} style={coverImageStyle()}>
            {post.title ?? ""}
          </h1>
        </motion.div>
        <motion.div
          key="body"
          initial={{ y: "200%" }}
          animate={{ y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: easeOut }}
          className={style.content}
        >
          <p className={style.body}>{post.body ?? ""}</p>
        </motion.div>
        {images.length !== 0 && (
          <motion.div
            key="image"
            initial={{ y: "350%" }}
            animate={{ y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: easeOut }}
            className={`${style.content} ${style.contentBottom}`}
          >
            {images.map((imageUrl, index) => (
              <img
                key={imageUrl + index}
                src={imageUrl}
                loading="lazy"
                className={style.image}
              ></img>
            ))}
          </motion.div>
        )}
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
