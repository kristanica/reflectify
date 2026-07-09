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
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";
import { signIn } from "next-auth/react";
import loginAction from "@/actions/loginAction";
import { initialState } from "@/hooks/authState";
import { ReflectifyLogo } from "../ReflectifyLogo";

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

  const inputGroupClass =
    "border-mocha-surface1 bg-mocha-crust/70 text-mocha-text focus-within:border-mocha-mauve/70";
  const iconClass = "text-mocha-overlay1";

  return (
    <form action={formAction} className="w-full">
      <FieldGroup className="text-mocha-text">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex size-20 items-center justify-center border border-mocha-mauve/35 bg-mocha-crust shadow-[0_0_22px_rgba(203,166,247,0.12)]">
            <ReflectifyLogo className="size-14" />
          </div>

          <h1 className="text-2xl font-black uppercase tracking-[0.08em] text-mocha-text">
            Login to your account
          </h1>
          <p className="max-w-sm text-balance text-sm leading-6 text-mocha-overlay1">
            Restore your session and return to the archive.
          </p>
        </div>
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
              name="password"
              type={isPasswordShown ? "text " : "password"}
              id="password"
            />
            <InputGroupAddon className={iconClass}>
              <Lock />
            </InputGroupAddon>

            <InputGroupButton
              variant="ghost"
              className="text-mocha-overlay1 hover:text-mocha-lavender"
              onClick={() => setPasswordShown((prev) => !prev)}
            >
              {isPasswordShown ? <Eye /> : <EyeClosed />}
            </InputGroupButton>
          </InputGroup>
        </Field>
        <Field>
          <Button
            type="submit"
            disabled={isPending}
            className="h-11 border-mocha-mauve bg-mocha-mauve font-mono text-xs font-black uppercase tracking-[0.16em] text-mocha-crust hover:bg-mocha-lavender"
          >
            {isPending ? <Spinner /> : "Login"}
          </Button>
        </Field>
        <FieldSeparator className="text-mocha-overlay1">
          Or continue with
        </FieldSeparator>

        <FieldGroup className="flex flex-col md:flex-row">
          <Field>
            <Button
              type="button"
              variant="ghost"
              className="h-11 border border-mocha-surface1 bg-mocha-crust/60 font-mono text-xs uppercase tracking-[0.08em] text-mocha-subtext0 hover:bg-mocha-surface0 hover:text-mocha-text"
              onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-brand-github-copilot"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 18v-5.5c0 -.667 .167 -1.333 .5 -2" />
                <path d="M12 7.5c0 -1 -.01 -4.07 -4 -3.5c-3.5 .5 -4 2.5 -4 3.5c0 1.5 0 4 3 4c4 0 5 -2.5 5 -4" />
                <path d="M4 12c-1.333 .667 -2 1.333 -2 2c0 1 0 3 1.5 4c3 2 6.5 3 8.5 3s5.499 -1 8.5 -3c1.5 -1 1.5 -3 1.5 -4c0 -.667 -.667 -1.333 -2 -2" />
                <path d="M20 18v-5.5c0 -.667 -.167 -1.333 -.5 -2" />
                <path d="M12 7.5l0 -.297l.01 -.269l.027 -.298l.013 -.105l.033 -.215c.014 -.073 .029 -.146 .046 -.22l.06 -.223c.336 -1.118 1.262 -2.237 3.808 -1.873c2.838 .405 3.703 1.797 3.93 2.842l.036 .204c0 .033 .01 .066 .013 .098l.016 .185l0 .171l0 .49l-.015 .394l-.02 .271c-.122 1.366 -.655 2.845 -2.962 2.845c-3.256 0 -4.524 -1.656 -4.883 -3.081l-.053 -.242a3.865 3.865 0 0 1 -.036 -.235l-.021 -.227a3.518 3.518 0 0 1 -.007 -.215l.005 0" />
                <path d="M10 15v2" />
                <path d="M14 15v2" />
              </svg>
              Login with GitHub
            </Button>
          </Field>

          <Field>
            <Button
              type="button"
              variant="ghost"
              className="h-11 border border-mocha-surface1 bg-mocha-crust/60 font-mono text-xs uppercase tracking-[0.08em] text-mocha-subtext0 hover:bg-mocha-surface0 hover:text-mocha-text"
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-brand-google"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M20.945 11a9 9 0 1 1 -3.284 -5.997l-2.655 2.392a5.5 5.5 0 1 0 2.119 6.605h-4.125v-3h7.945" />
              </svg>{" "}
              Login with Google
            </Button>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
