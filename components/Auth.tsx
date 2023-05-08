import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsGoogle } from "react-icons/bs";
import { auth } from "@/firebase/client";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

type Props = {
  title: string;
  href: string;
  description: string;
};

const Auth: React.FC<Props> = ({ title, href, description }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // translate errors
  const translateErrors = (error: string) => {
    switch (error) {
      case "Firebase: Error (auth/wrong-password).":
        return "La contraseña no es válida o el usuario está registrado con Google";
      case "Firebase: Error (auth/user-not-found).":
        return "No hay ningún registro de usuario que corresponda a este identificador. Es posible que el usuario haya sido eliminado";
      case "Firebase: Password should be at least 6 characters (auth/weak-password).":
        return "La contraseña debe tener al menos 6 caracteres";
      case "Firebase: Error (auth/invalid-email).":
        return " La dirección de correo electrónico no es válida";
      case "Firebase: Error (auth/email-already-in-use).":
        return "La dirección de correo electrónico ya está siendo utilizada por otra cuenta";
      default:
        return error;
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const signInWithEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.log(error.message);
      toast.error(translateErrors(error.message));
    }
  };

  const signUpWithEmail = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      console.log(error.message);

      toast.error(translateErrors(error.message));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (href === "/register") {
      signInWithEmail();
    } else {
      signUpWithEmail();
    }
    console.log(email, password);
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 lg:mt-6 lg:mb-0 my-14    ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto heart"
            src="/4.png"
            alt="Heart"
            width={200}
            height={200}
            quality={100}
            priority
          />
          <h1 className="mt-10 text-center text-pink-600  text-6xl font-bold  tracking-tighter   leading-none">
            {title}
          </h1>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm z-0">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="flex items-center justify-between">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Correo"
                  className="input input-bordered input-secondary w-full "
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={
                    href === "/register" ? "current-password" : "new-password"
                  }
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Contraseña"
                  className="input input-bordered input-secondary w-full "
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="btn capitalize flex w-full border-none justify-center rounded-md bg-gradient-to-r from-pink-500 to-rose-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-lg  hover:from-pink-700 hover:to-rose-800 hover:-translate-y-1 hover:shadow-2xl transition duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
              >
                {title}
              </button>
              <button
                onClick={signInWithGoogle}
                type="button"
                className="btn capitalize flex w-full  mt-3 border-none justify-center rounded-md bg-gradient-to-r from-slate-100 to-slate-200 px-3 py-1.5 text-sm font-semibold leading-6  shadow-lg  hover:from-slate-200 hover:to-slate-300 hover:-translate-y-1 hover:shadow-2xl transition duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 text-slate-800 "
              >
                {/* google icon */}
                <BsGoogle className="w-5 h-5 mr-2 text-rose-800" />
                {title} con Google
              </button>
            </div>
          </form>
        </div>
        <Link
          className="fixed top-6 lg:right-6  btn btn-sm btn-secondary  "
          href={href}
        >
          {description}
        </Link>
      </div>
    </>
  );
};

export default Auth;
