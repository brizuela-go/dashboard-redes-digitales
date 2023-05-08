import Layout from "@/components/Layout";
import initAuth from "@/firebase/initAuth";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

initAuth();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster />
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </>
  );
}
