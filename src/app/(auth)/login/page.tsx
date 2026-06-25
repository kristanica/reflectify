import AnimateAuth from "@/components/auth/AnimateAuth";
import Decorator from "@/components/auth/Decorator";

const Login = () => {
  return (
    <main className="flex w-full min-h-screen dark:bg-mocha-crust overflow-hidden">
      <section className="w-full  my-auto mx-5 lg:w-[40%] md:flex md:items-center md:justify-center  ">
        <AnimateAuth></AnimateAuth>
      </section>
      <section className="relative hidden lg:flex lg:flex-1 flex-col items-center justify-center m-5 rounded-3xl border-mocha-surface1 shadow-2xl">
        <Decorator></Decorator>
      </section>
    </main>
  );
};

export default Login;
