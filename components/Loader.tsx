import React from "react";
import Image from "next/image";

type Props = {};

const Loader = (props: Props) => {
  return (
    <div className=" flex flex-col justify-center items-center mt-32 p-10 w-full space-y-5 overflow-hidden">
      <Image
        src="/ppgloader.gif"
        width={500}
        height={500}
        priority
        quality={100}
        alt="loader"
      />
      <h3 className="text-2xl font-semibold tracking-tighter text-center heart bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-pink-700">
        Cargando...
      </h3>
    </div>
  );
};

export default Loader;
