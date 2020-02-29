import * as React from "react";
import { NextPage } from "next";
import * as style from "../../styles/workDetail.scss";
import axios from "axios";
import { Content } from "interfaces/Posts";
import { motion } from "framer-motion";
import AnimatedLayout from "../../components/AnimatedLayout/AnimatedLayout";

type Props = {
  post: Content;
};

const WorkDetail: NextPage<Props> = (props: Props) => {
  return (
    <AnimatedLayout title="Works | Kurogoma4D">
      <motion.div
        key="detail"
        className={style.contentsWrap}
        initial={{ y: "150%" }}
        animate={{ y: 0 }}
        exit={{ y: "150%" }}
        transition={{ duration: 0.4 }}
      >
        <div className={style.background}>
          <p>{props.post?.id ?? ""}</p>
          <p>{props.post?.body ?? ""}</p>
          <p>{props.post?.cover_image?.url ?? ""}</p>
          <p>{props.post?.createdAt ?? ""}</p>
          <p>{props.post?.image_first ?? ""}</p>
        </div>
      </motion.div>
    </AnimatedLayout>
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
