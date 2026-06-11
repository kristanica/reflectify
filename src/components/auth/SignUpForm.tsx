"use client";

import React, { useState } from "react";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../ui/input-group";
import { Lock, Mail, Eye, EyeClosed, User } from "lucide-react";

const SignUpForm = () => {
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] =
    useState<boolean>(false);
  return (
    <div className="w-full bg-transparent border-none border-0 ">
      <form className="md:w-xl mx-auto">
        <FieldGroup className="text-foreground">
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold text-foreground">
              Create an Account{" "}
            </h1>
            <p className="text-sm text-balance text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <Field>
            <FieldLabel htmlFor="email" className="text-foreground">
              Username
            </FieldLabel>

            <InputGroup>
              <InputGroupInput placeholder="Username" id="email" />
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
              <InputGroupInput placeholder="Email" id="email" />
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
            <FieldLabel htmlFor="password" className="text-foreground">
              Confirm Password
            </FieldLabel>
            <InputGroup>
              <InputGroupInput
                placeholder="********"
                type={isConfirmPasswordShown ? "text " : "password"}
                id="password"
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
            <Button type="submit">Regiter</Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

export default SignUpForm;
