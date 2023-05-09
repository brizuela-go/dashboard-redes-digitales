import { Inter } from "next/font/google";
import React, { useEffect, useState } from "react";

type Props = {};

import Image from "next/image";
import { db } from "@/firebase/client";
import { ref, onValue } from "firebase/database";

import { NextPage } from "next";

const inter = Inter({ subsets: ["latin"] });

import {
  BsDroplet,
  BsDropletFill,
  BsDropletHalf,
  BsFillCheckCircleFill,
} from "react-icons/bs";
import { RiErrorWarningFill, RiSkullFill } from "react-icons/ri";
import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";
import Head from "next/head";
import Loader from "@/components/Loader";
import { useRouter } from "next/router";

const refsFirstTest = ["test/Humedad", "test/Indice_calor", "test/Temperatura"];
const refsSecondTest = ["test2/Calidad_aire", "test2/co2", "test2/tvoc"];

const Dashboard: NextPage<Props> = () => {
  const [loaded, setLoaded] = useState(false);

  const [humedad, setHumedad] = useState(0);
  const [indiceCalor, setIndiceCalor] = useState(0);
  const [temperatura, setTemperatura] = useState(0);

  const [calidadAire, setCalidadAire] = useState(0);
  const [co2, setCo2] = useState(0);
  const [tvoc, setTvoc] = useState(0);

  useEffect(() => {
    // Fetch data for each reference and update the corresponding state variable
    refsFirstTest.forEach((valref) => {
      const reference = ref(db, valref);
      onValue(reference, (snapshot) => {
        const data = snapshot.val();

        if (valref === "test/Humedad") {
          setHumedad(data);
        } else if (valref === "test/Indice_calor") {
          setIndiceCalor(data);
        } else if (valref === "test/Temperatura") {
          setTemperatura(data);
        }
      });
    });

    refsSecondTest.forEach((valref) => {
      const reference = ref(db, valref);
      onValue(reference, (snapshot) => {
        const data = snapshot.val();

        if (valref === "test2/Calidad_aire") {
          setCalidadAire(data);
        } else if (valref === "test2/co2") {
          setCo2(data);
        } else if (valref === "test2/tvoc") {
          setTvoc(data);
        }

        setLoaded(true);
      });
    });
  }, []);

  const data = [
    {
      title: "CO2",
      value: co2,
      metric: "ppm",
      figure:
        co2 < 400 ? (
          <BsFillCheckCircleFill className=" h-10 w-10 text-success" />
        ) : co2 < 800 ? (
          <RiErrorWarningFill className=" h-10 w-10 text-warning animate-pulse" />
        ) : (
          <RiSkullFill className=" h-10 w-10 text-error animate-pulse" />
        ),
      class: "text-primary",
    },
    {
      title: "Humedad",
      value: humedad,
      metric: "habs",
      figure:
        humedad < 20 ? (
          <BsDroplet className="h-10 w-10 text-sky-300" />
        ) : humedad < 70 ? (
          <BsDropletHalf className="h-10 w-10 text-sky-500 " />
        ) : (
          <BsDropletFill className="h-10 w-10 text-sky-800" />
        ),
      class: "text-secondary",
    },
    {
      title: "Índice de Calor",
      value: indiceCalor,
      metric: "HI (°C)",
      figure: <span className="text-4xl">🥵</span>,
      class: "text-black",
    },
    {
      title: "Temperatura",
      value: temperatura,
      metric: "°C",
      figure:
        temperatura < 10 ? (
          <FaTemperatureLow className=" h-10 w-10 text-indigo-500" />
        ) : temperatura < 30 ? (
          <FaTemperatureHigh className=" h-10 w-10 text-success" />
        ) : (
          <FaTemperatureHigh className=" h-10 w-10 text-error" />
        ),
      class: "text-primary",
    },
    {
      title: "Calidad del Aire",
      value: calidadAire,
      metric: "ICA",
      figure: <span className="text-4xl">🌫️</span>,
      class: "text-secondary",
    },
    {
      title: "TVOC",
      value: tvoc,
      metric: "µg / m3",
      figure: <span className="text-4xl">🌫️</span>,
      class: "text-black",
    },
  ];

  const router = useRouter();

  useEffect(() => {
    const audio = new Audio("/rosa_pastel.mp3");

    // Load and play audio when page is visited or reloaded
    const playAudio = () => {
      audio.load();
      audio.loop = true;
      audio.play();
    };

    playAudio();

    // Pause audio when leaving the page
    const pauseAudio = () => {
      audio.pause();
    };

    router.events.on("routeChangeStart", pauseAudio);

    return () => {
      pauseAudio();
      router.events.off("routeChangeStart", pauseAudio);
    };
  }, [router.events]);

  const AuthUser = useAuthUser();

  return (
    <>
      <Head>
        <title>Dashboard 💅</title>
        <meta
          name="description"
          content="Redes Digitales de Datos 💅 Dashboard"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {loaded ? (
        <>
          <header>
            <div className="navbar bg-transparent ">
              <div className="flex-1">
                <p className="btn btn-ghost normal-case text-xl font-semibold bg-clip-text text-transparent from-pink-500  to-pink-600 bg-gradient-to-r">
                  Redes Digitales de Datos 💅
                </p>
              </div>
              <div className="flex-none">
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar avimg"
                  >
                    <div className="w-10 rounded-full">
                      <Image
                        src={AuthUser.photoURL || "/pp.png"}
                        alt="Profile Picture"
                        width={40}
                        height={40}
                        priority
                        quality={100}
                        className="rounded-full avimg"
                      />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <button
                      className="btn btn-secondary text-slate-800 "
                      onClick={AuthUser.signOut}
                    >
                      Cerrar Sesión
                    </button>
                  </ul>
                </div>
              </div>
            </div>
          </header>
          <section
            className={`flex  flex-col  justify-center   lg:p-24 p-14   ${inter.className}   `}
          >
            <div className=" flex lg:flex-row lg:justify-center items-center flex-col mb-8 lg:-mt-20">
              <h1 className="lg:text-8xl text-6xl font-bold text-center  tracking-tighter  bg-clip-text text-transparent from-pink-400 to-rose-500 bg-gradient-to-r  ">
                Dashboard{" "}
              </h1>
              <Image
                src="/kirby.webp"
                alt="Kirby"
                width={120}
                height={120}
                priority
                quality={100}
                className="hover:scale-150 transition duration-300 ease-in-out transform"
              />
            </div>
            <h3 className="lg:text-3xl text-xl font-bold text-center mb-6  tracking-tighter  bg-clip-text text-transparent from-pink-400 to-rose-500 bg-gradient-to-r  ">
              ¡Bienvenidx,{" "}
              {AuthUser.displayName ? AuthUser.displayName : AuthUser.email}! 🦄
            </h3>

            {/* {data.map((dataValue) => (

          ))} */}
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-y-6 gap-y-4 lg:gap-x-10 mt-10 ">
              {data.map((dataValue, index) => (
                <div
                  className="stat rounded-xl shadow-pink-100 shadow-xl bg-gradient-to-bl hover:shadow-2xl z-0 transition duration-300 ease-in-out hover:shadow-pink-200  from-rose-50 via-white to-pink-50 hover:scale-105 lg:gap-x-14"
                  key={index}
                >
                  <div className={`stat-figure ${dataValue.class}`}>
                    {dataValue.figure}
                  </div>
                  <div className="stat-title">{dataValue.title}</div>
                  <div className={`stat-value ${dataValue.class}`}>
                    {dataValue?.value?.toFixed(2) || 0}
                  </div>
                  <div className="stat-desc">{dataValue.metric}</div>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default withAuthUser<any>({
  LoaderComponent: () => <Loader />,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenAuthed: AuthAction.RENDER,
})(Dashboard);
