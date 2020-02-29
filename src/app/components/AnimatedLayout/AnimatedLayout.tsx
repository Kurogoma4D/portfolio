import * as React from "react";
import Head from "next/head";
import { NextPage } from "next";
import ImageHeader from "../ImageHeader/ImageHeader";

type Props = {
  children?: React.ReactNode;
  title?: string;
};

const AnimatedLayout: NextPage<Props> = ({ children, title = "title" }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <header></header>
      <ImageHeader
        imagePath="/static/images/works/cg_kirameki.png"
        text="作品"
      />
      {children}

      <footer>
        Icons made by{" "}
        <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
          Freepik
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          {" "}
          www.flaticon.com
        </a>
      </footer>
    </div>
  );
};

export default AnimatedLayout;
