import * as React from "react";
import { NextPage } from "next";
import * as style from "../../styles/workDetail.scss";
import axios from "axios";
import { Content } from "interfaces/Posts";
import { motion } from "framer-motion";
import ImageHeader from "components/ImageHeader/ImageHeader";
import Layout from "components/LayoutComp/Layout";

type Props = {
  post: Content;
};

const WorkDetail: NextPage<Props> = (props: Props) => {
  return (
    <Layout title="Works | Kurogoma4D">
      <ImageHeader
        imagePath="/static/images/works/cg_kirameki.png"
        text="作品"
      />
      <div className={style.background}>
        <p>{props.post?.id ?? ""}</p>
        <p>{props.post?.body ?? ""}</p>
        <p>{props.post?.cover_image?.url ?? ""}</p>
        <p>{props.post?.createdAt ?? ""}</p>
        <p>{props.post?.image_first ?? ""}</p>
        <motion.div animate={{}}></motion.div>
      </div>
    </Layout>
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
