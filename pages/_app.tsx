import Layout from "@/components/Layout";
import initAuth from "@/firebase/initAuth";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

initAuth();

export default function App({ Component, pageProps }: AppProps) {
  console.log(
    "%c ¡Bienvenidx, neni! 💅",
    "font-weight: bold; font-size: 50px;color: pink; text-shadow: 3px 3px 0 rgb(217,31,218) , 6px 6px 0 rgb(217,31,218)"
  );
  return (
    <>
      <Toaster />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
