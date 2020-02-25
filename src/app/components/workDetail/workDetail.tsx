import * as React from "react";
import { NextPage } from "next";
import * as style from "./workDetail.scss";
import axios from "axios";
import { Content } from "interfaces/Posts";
import { useState, useEffect } from "react";

type Props = {
  id: string;
};

const WorkDetail: NextPage<Props> = (props: Props) => {
  const [post, setPost] = useState<Content | null>(null);

  const fetchDetail = async () => {
    const key = {
      headers: { "X-API-KEY": process.env.cms_api_key }
    };
    await axios
      .get<Content>(`https://krgm4d.microcms.io/api/v1/works/${props.id}`, key)
      .then(res => {
        setPost(res.data);
      });
  };

  useEffect(() => {
    fetchDetail();
    return () => {};
  }, [fetchDetail]);

  return (
    <div className={style.modalBase}>
      <p>{post?.id ?? ""}</p>
      <p>{post?.body ?? ""}</p>
      <p>{post?.cover_image?.url ?? ""}</p>
      <p>{post?.createdAt ?? ""}</p>
      <p>{post?.image_first ?? ""}</p>
    </div>
  );
};

export default WorkDetail;
