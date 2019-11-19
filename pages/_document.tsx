import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            href="https://fonts.googleapis.com/css?family=M+PLUS+1p:400,700&display=swap&text=%E4%BA%BA%E4%BD%9C%E5%93%81%E6%8A%80%E8%A1%93"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c:300,700&display=swap"
            rel="stylesheet"
          ></link>
          <link rel="icon" href="static/images/favicon.ico"></link>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="static/images/sushi.png"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
