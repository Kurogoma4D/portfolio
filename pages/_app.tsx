import App from "next/app";
import "../styles/global.scss";
import Layout from "../components/LayoutComp/Layout";

export default class MyApp extends App<object> {
  render() {
    const { Component } = this.props;
    return (
      <Layout title="Kurogoma4D">
        <Component />
      </Layout>
    );
  }
}
