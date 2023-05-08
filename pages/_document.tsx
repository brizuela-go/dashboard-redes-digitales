import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="es" data-theme="cupcake">
      <Head />
      <body className="bg-gradient-to-r from-rose-50 via-pink-100  to-rose-200;">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
