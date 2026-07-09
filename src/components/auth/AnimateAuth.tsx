"use client";

import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { FieldDescription } from "../ui/field";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "../ui/button";

const AnimateAuth = () => {
  const [authForm, toggleAuthForm] = useState<"login" | "signUp">("login");

  return (
    <AnimatePresence mode="wait">
      {authForm === "login" ? (
        <motion.div
          key="login"
          initial={{ opacity: 0, x: "-10%" }}
          animate={{ opacity: 1, x: "0%" }}
          exit={{ opacity: 0, x: "-10%" }}
          className="w-full"
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          <LoginForm />
          <FieldDescription className="mt-6 pt-4 text-center text-xs font-mono text-mocha-overlay1">
            Don&apos;t have an account?{" "}
            <Button
              type="button"
              onClick={() => toggleAuthForm("signUp")}
              variant="link"
              className="h-auto px-1 py-0 text-xs font-bold uppercase tracking-[0.12em] text-mocha-mauve underline-offset-4 hover:text-mocha-lavender"
            >
              Sign up
            </Button>
          </FieldDescription>
        </motion.div>
      ) : (
        <motion.div
          key="signUp"
          initial={{ opacity: 0, x: "10%" }}
          animate={{ opacity: 1, x: "0%" }}
          exit={{ opacity: 0, x: "10%" }}
          className="w-full"
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
          }}
        >
          <SignUpForm toggleAuthForm={toggleAuthForm} />

          <FieldDescription className="mt-6 border-t border-mocha-surface1 pt-4 text-center text-xs font-mono text-mocha-overlay1">
            Already have an account?{" "}
            <Button
              type="button"
              onClick={() => toggleAuthForm("login")}
              variant="link"
              className="h-auto px-1 py-0 text-xs font-bold uppercase tracking-[0.12em] text-mocha-mauve underline-offset-4 hover:text-mocha-lavender"
            >
              Login
            </Button>
          </FieldDescription>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimateAuth;
