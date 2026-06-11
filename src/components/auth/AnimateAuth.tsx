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
    <div className="relative">
      <AnimatePresence mode="wait">
        {authForm === "login" ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: "-10%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "-10%" }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
          >
            <LoginForm></LoginForm>
            <FieldDescription className="text-center">
              Don&apos;t have an account?{" "}
              <Button
                onClick={() => toggleAuthForm("signUp")}
                variant="link"
                className="underline-offset-0 text-muted-foreground hover:text-foreground text-xs"
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
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
          >
            <SignUpForm></SignUpForm>

            <FieldDescription className="text-center">
              Already have an Account?
              <Button
                onClick={() => toggleAuthForm("login")}
                variant="ghost"
                className="underline-offset-0 text-muted-foreground hover:text-foreground text-xs"
              >
                Login
              </Button>
            </FieldDescription>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimateAuth;
