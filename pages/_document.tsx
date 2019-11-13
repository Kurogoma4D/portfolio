import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link
            href="https://fonts.googleapis.com/css?family=M+PLUS+1p:400,700&display=swap&subset=japanese"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c:300,700&display=swap&subset=japanese"
            rel="stylesheet"
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
