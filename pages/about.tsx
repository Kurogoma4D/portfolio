import { NextPage } from "next";
// import * as style from "../styles/about.scss";
import Layout from "../components/LayoutComp/Layout";
import ImageHeader from "../components/ImageHeader/ImageHeader";

const About: NextPage = () => {
  return (
    <Layout title="About | Kurogoma4D">
      <ImageHeader imagePath="/static/images/about-header.jpg" text="人" />
      <div></div>
    </Layout>
  );
};

export default About;
