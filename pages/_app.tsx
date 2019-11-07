import App from "next/app";
import "../styles/global.scss";

export default class MyApp extends App<object> {
  render() {
    const { Component } = this.props;
    return <Component />;
  }
}
