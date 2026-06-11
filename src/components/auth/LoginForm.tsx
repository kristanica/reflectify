"use client";
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "../ui/field";
import { Button } from "../ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { Eye, EyeClosed, Lock, Mail } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import loginAction from "@/app/actions/loginAction";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";
import { signIn } from "next-auth/react";
const initialState: Auth = { error: "", success: false };

const LoginForm = () => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );

  const [isPasswordShown, setPasswordShown] = useState<boolean>(false);

  useEffect(() => {
    if (!state.success) {
      return;
    }
    router.push("/dashboard");
  }, [router, state.success]);

  return (
    <div className="w-full bg-transparent border-none border-0 ">
      <form action={formAction} className="md:w-xl mx-auto">
        <FieldGroup className="text-foreground">
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold text-foreground">
              Login to your account
            </h1>
            <p className="text-sm text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
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
                name="password"
                type={isPasswordShown ? "text " : "password"}
                id="password"
              />
              <InputGroupAddon>
                <Lock></Lock>
              </InputGroupAddon>

              <InputGroupButton
                variant="ghost"
                className="text-foreground"
                onClick={() => setPasswordShown((prev) => !prev)}
              >
                {isPasswordShown ? <Eye></Eye> : <EyeClosed></EyeClosed>}
              </InputGroupButton>
            </InputGroup>
          </Field>
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? <Spinner></Spinner> : "Login"}
            </Button>
          </Field>
          <FieldSeparator>Or continue with</FieldSeparator>
          <Field>
            <Button
              type="button"
              onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 30 30"
              >
                <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
              </svg>{" "}
              Login with GitHub
            </Button>
          </Field>

          <Field>
            <Button
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="100"
                height="100"
                viewBox="0 0 30 30"
              >
                <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
              </svg>
              Login with Google
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

export default LoginForm;
