"use client";

import React, { useActionState, useEffect, useState } from "react";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { Lock, Mail, Eye, EyeClosed, User } from "lucide-react";
import { initialState } from "@/hooks/authState";
import signUpAction from "@/actions/signUpAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";
import { ReflectifyLogo } from "../ReflectifyLogo";

const SignUpForm = ({
  toggleAuthForm,
}: {
  toggleAuthForm: React.Dispatch<React.SetStateAction<"login" | "signUp">>;
}) => {
  const router = useRouter();
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] =
    useState<boolean>(false);

  const [state, formAction, isPending] = useActionState(
    signUpAction,
    initialState,
  );

  useEffect(() => {
    if (!state) {
      return;
    }

    if (state.success) {
      toast.success("Account created succesfully!");
      toggleAuthForm("login");
    } else if (!state.success && state.error) {
      toast.error(`Validation Error  `, {
        description: state.error,
      });
    }
  }, [state, router, toggleAuthForm]);

  const inputGroupClass =
    "border-mocha-surface1 bg-mocha-crust/70 text-mocha-text focus-within:border-mocha-mauve/70";
  const iconClass = "text-mocha-overlay1";

  return (
    <div className="w-full border-0 bg-transparent">
      <form action={formAction} className="mx-auto w-full">
        <FieldGroup className="text-mocha-text">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="flex size-20 items-center justify-center border border-mocha-mauve/35 bg-mocha-crust shadow-[0_0_22px_rgba(203,166,247,0.12)]">
              <ReflectifyLogo className="size-14" />
            </div>

            <h1 className="text-2xl font-black uppercase tracking-[0.08em] text-mocha-text">
              Create an Account
            </h1>
            <p className="max-w-sm text-balance text-sm leading-6 text-mocha-overlay1">
              Create a profile, build seed archives, and start your first run.
            </p>
          </div>
          <Field>
            <FieldLabel
              htmlFor="name"
              className="font-mono text-xs uppercase tracking-[0.14em] text-mocha-subtext0"
            >
              Username
            </FieldLabel>

            <InputGroup className={inputGroupClass}>
              <InputGroupInput placeholder="Username" id="name" name="name" />
              <InputGroupAddon className={iconClass}>
                <User />
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel
              htmlFor="email"
              className="font-mono text-xs uppercase tracking-[0.14em] text-mocha-subtext0"
            >
              Email
            </FieldLabel>

            <InputGroup className={inputGroupClass}>
              <InputGroupInput placeholder="Email" id="email" name="email" />
              <InputGroupAddon className={iconClass}>
                <Mail />
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel
              htmlFor="password"
              className="font-mono text-xs uppercase tracking-[0.14em] text-mocha-subtext0"
            >
              Password
            </FieldLabel>
            <InputGroup className={inputGroupClass}>
              <InputGroupInput
                placeholder="********"
                type={isPasswordShown ? "text " : "password"}
                id="password"
                name="password"
              />
              <InputGroupAddon className={iconClass}>
                <Lock />
              </InputGroupAddon>

              <InputGroupButton
                variant="ghost"
                className="text-mocha-overlay1 hover:text-mocha-lavender"
                onClick={() => setIsPasswordShown((prev) => !prev)}
              >
                {isPasswordShown ? <Eye /> : <EyeClosed />}
              </InputGroupButton>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel
              htmlFor="confirmPassword"
              className="font-mono text-xs uppercase tracking-[0.14em] text-mocha-subtext0"
            >
              Confirm Password
            </FieldLabel>
            <InputGroup className={inputGroupClass}>
              <InputGroupInput
                placeholder="********"
                type={isConfirmPasswordShown ? "text " : "password"}
                name="confirmPassword"
                id="confirmPassword"
              />
              <InputGroupAddon className={iconClass}>
                <Lock />
              </InputGroupAddon>

              <InputGroupButton
                variant="ghost"
                className="text-mocha-overlay1 hover:text-mocha-lavender"
                onClick={() => setIsConfirmPasswordShown((prev) => !prev)}
              >
                {isConfirmPasswordShown ? <Eye /> : <EyeClosed />}
              </InputGroupButton>
            </InputGroup>
          </Field>

          <Field>
            <Button
              type="submit"
              disabled={isPending}
              className="h-11 border-mocha-mauve bg-mocha-mauve font-mono text-xs font-black uppercase tracking-[0.16em] text-mocha-crust hover:bg-mocha-lavender"
            >
              {isPending ? <Spinner /> : "Register"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

export default SignUpForm;
