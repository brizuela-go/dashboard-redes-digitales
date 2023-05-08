import Auth from "@/components/Auth";
import { NextPage } from "next";
import { AuthAction, withAuthUser } from "next-firebase-auth";
import Loader from "@/components/Loader";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Inicia Sesión 💅</title>
        <meta
          name="description"
          content="Redes Digitales de Datos 💅 Inicia Sesión"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <Auth
          title="Inicia Sesión"
          href="/register"
          description="¿Aún no estás registradx? Registrate aquí"
        />
      </section>
    </>
  );
};

export default withAuthUser<any>({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  LoaderComponent: () => <Loader />,
  whenAuthedBeforeRedirect: AuthAction.SHOW_LOADER,
})(Home);
