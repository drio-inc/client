import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="title" content="Drio - We make data sharing simple!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="We are an insertable SaaS service that will connect to your data sources and allow them to be accessed by anyone you have a contract with based on the access rights you define!"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://drio.ai" />
        <meta
          property="og:title"
          content="Drio - We make data sharing simple!"
        />
        <meta
          property="og:description"
          content="We are an insertable SaaS service that will connect to your data sources and allow them to be accessed by anyone you have a contract with based on the access rights you define!"
        />

        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
