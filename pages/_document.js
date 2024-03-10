// 这个四个属性是必须的
import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="react next music app" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="keyword" content="广州弘源科教 Next Music Web" />
      </Head>
      <body className="hy-body">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
