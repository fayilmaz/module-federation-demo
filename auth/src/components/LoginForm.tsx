import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "shell/ui/Button";
import { ButtonWithLoading } from "shell/ui/ButtonWithLoading";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "shell/ui/Form";
import { Input } from "shell/ui/Input";
import useShellStore from "shell/useShellStore";

const FormSchema = z.object({
  email: z
    .string()
    .min(2, { message: "A valid email address must be entered." })
    .email({ message: "A valid email address must be entered." }),
  password: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

interface IProps {
  handleLogin: (formValues: { email: string; password: string }) => void;
}

const LoginForm = ({ handleLogin }: IProps) => {
  const { loginData } = useShellStore().userState;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(formData: z.infer<typeof FormSchema>) {
    handleLogin(formData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your e-mail address"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ButtonWithLoading
          variant="custom"
          className="bg-slate-200 w-full"
          loading={loginData.fetching}
        >
          Login
        </ButtonWithLoading>
      </form>
    </Form>
  );
};

export default LoginForm;
