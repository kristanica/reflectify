import AnimateAuth from "@/components/auth/AnimateAuth";
import Decorator from "@/components/auth/Decorator";

const Login = () => {
  return (
    <div className="dark:bg-black ">
      <main className="flex w-full min-h-screen">
        <section className="w-full lg:w-[35%] mx-5 flex flex-col items-center justify-center ">
          <AnimateAuth></AnimateAuth>
        </section>
        <section className="relative hidden lg:flex flex-1 flex-col items-center justify-center  m-5 rounded-3xl border-border border-gray-800 shadow-2xl">
          <Decorator></Decorator>
        </section>
      </main>
    </div>
  );
};

export default Login;
