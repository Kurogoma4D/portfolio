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

          <link rel="icon" href="static/images/favicon.ico"></link>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="static/images/sushi.png"
          ></link>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=M+PLUS+1p:400,700&display=swap&text=%E4%BD%9C%E5%93%81"
          ></link>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c:400,700&display=swap&subset=japanese"
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
