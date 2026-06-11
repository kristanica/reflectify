"use client";

import AnimateAuth from "@/components/auth/AnimateAuth";
import Balatro from "@/components/Balatro";
import { Label } from "@/components/ui/label";

const Login = () => {
  return (
    <div className="dark:bg-black ">
      <main className="flex w-full min-h-screen">
        <section className="w-full lg:w-[35%] mx-5 flex flex-col items-center justify-center ">
          <AnimateAuth></AnimateAuth>
        </section>
        <section className="relative hidden lg:flex flex-1 flex-col items-center justify-center bg-gray-900 bg-linear-to-br from-gray-800 m-5 rounded-3xl via-gray-800 to-gray-900 border border-gray-800 shadow-2xl">
          <Balatro></Balatro>

          <div className="flex absolute items-center justify-center gap-3 max-w-lg text-center flex-col p-8">
            <Label className=" text-4xl uppercase font-black tracking-widest text-amber-500">
              Reflectify
            </Label>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              An AI-powered roguelike study companion. Complete daily quizzes,
              conquer custom decks, and power up your academic journey.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Login;
