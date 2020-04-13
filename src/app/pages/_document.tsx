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
          <meta
            name="description"
            content="Kurogoma4Dのポートフォリオです。エンジニアっぽいこととCG屋っぽいことをしています。"
          />

          <meta property="og:title" content="Kurogoma4D" />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://drive.google.com/open?id=19J53LKIE0gMv3RDN_SYp00L96REdBCDf"
          />
          <meta property="og:image" content="サムネイル画像の URL" />
          <meta property="og:site_name" content="Kurogoma4D" />
          <meta
            property="og:description"
            content="Kurogoma4Dのポートフォリオです。エンジニアっぽいこととCG屋っぽいことをしています。"
          />

          <meta name="twitter:card" content="summary" />

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
