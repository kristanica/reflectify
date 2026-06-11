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

  return (
    <div className="w-full bg-transparent border-none border-0 ">
      <form action={formAction} className="md:w-xl mx-auto">
        <FieldGroup className="text-foreground">
          <div className="flex flex-col items-center gap-1 text-center">
            <ReflectifyLogo className="h-auto w-25"></ReflectifyLogo>

            <h1 className="text-2xl font-bold text-foreground">
              Create an Account
            </h1>
            <p className="text-sm text-balance text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <Field>
            <FieldLabel htmlFor="name" className="text-foreground">
              Username
            </FieldLabel>

            <InputGroup>
              <InputGroupInput placeholder="Username" id="name" name="name" />
              <InputGroupAddon>
                <User></User>
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <Field>
            <FieldLabel htmlFor="email" className="text-foreground">
              Email
            </FieldLabel>

            <InputGroup>
              <InputGroupInput placeholder="Email" id="email" name="email" />
              <InputGroupAddon>
                <Mail></Mail>
              </InputGroupAddon>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="password" className="text-foreground">
              Password
            </FieldLabel>
            <InputGroup>
              <InputGroupInput
                placeholder="********"
                type={isPasswordShown ? "text " : "password"}
                id="password"
                name="password"
              />
              <InputGroupAddon>
                <Lock></Lock>
              </InputGroupAddon>

              <InputGroupButton
                variant="ghost"
                className="text-foreground"
                onClick={() => setIsPasswordShown((prev) => !prev)}
              >
                {isPasswordShown ? <Eye></Eye> : <EyeClosed></EyeClosed>}
              </InputGroupButton>
            </InputGroup>
          </Field>
          <Field>
            <FieldLabel htmlFor="confirmPassword" className="text-foreground">
              Confirm Password
            </FieldLabel>
            <InputGroup>
              <InputGroupInput
                placeholder="********"
                type={isConfirmPasswordShown ? "text " : "password"}
                name="confirmPassword"
                id="confirmPassword"
              />
              <InputGroupAddon>
                <Lock></Lock>
              </InputGroupAddon>

              <InputGroupButton
                variant="ghost"
                className="text-foreground"
                onClick={() => setIsConfirmPasswordShown((prev) => !prev)}
              >
                {isConfirmPasswordShown ? <Eye></Eye> : <EyeClosed></EyeClosed>}
              </InputGroupButton>
            </InputGroup>
          </Field>

          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? <Spinner></Spinner> : "Register"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

export default SignUpForm;
