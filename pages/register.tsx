import Auth from "@/components/Auth";
import { NextPage } from "next";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import Loader from "@/components/Loader";
import Head from "next/head";

const Register: NextPage = () => {
  return (
    <>
      <Head>
        <title>Regístrate 💅</title>
        <meta
          name="description"
          content="Redes Digitales de Datos 💅 Regístrate"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <Auth
          title="Regístrate"
          href="/"
          description="¿Ya tienes una cuenta? Inicia Sesión aquí"
        />
      </section>
    </>
  );
};

export default withAuthUser<any>({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  LoaderComponent: () => <Loader />,
  whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
})(Register);
