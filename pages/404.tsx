import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Head from "next/head";
import { NextPage } from "next";

type Props = {};

const gifs = [
  "/denied1.gif",
  "/denied2.gif",
  "/denied3.gif",
  "/denied4.gif",
  "/denied5.gif",
];

const FourOFour: NextPage<Props> = () => {
  const router = useRouter();
  const [count, setCount] = useState(5);
  const [randomGif, setRandomGif] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    count === 0 && router.push("/");
    return () => clearInterval(interval);
  }, [count, router]);

  useEffect(() => {
    const random = Math.floor(Math.random() * gifs.length);
    setRandomGif(gifs[random]);
  }, []);

  return (
    <>
      <Head>
        <title>404 | ¿Te perdiste, neni?</title>
        <meta
          name="description"
          content="404 | ¿Te perdiste, neni? Redirigiéndote en 5 segundos..."
        />
      </Head>
      <div
        className="
    flex flex-col justify-center items-center mt-32 p-10 w-full space-y-5 overflow-hidden
    "
      >
        <h2 className="text-4xl font-bold tracking-tighter text-center mb-8 text-pink-700">
          404 | Página no encontrada
        </h2>
        <Image
          src={randomGif}
          width={500}
          height={500}
          priority
          quality={100}
          alt="loader"
        />
        <h3 className="text-2xl mt-6 font-semibold tracking-tighter text-center text-pink-700">
          ¿Te perdiste, Neni? 🙄 Redirigiéndote en {count} segundos...
        </h3>
      </div>
    </>
  );
};

export default FourOFour;
