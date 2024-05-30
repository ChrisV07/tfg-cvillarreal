"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { RegisterSchema } from "@/src/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/FormSuccess";
import { register } from "@/actions/register";
import { useState, useTransition } from "react";


export default function RegisterForm() {
   const [error, setError] = useState<string | undefined>("")
   const [success, setSuccess] = useState<string | undefined>("")
   const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    
    startTransition(() => {
      register(values)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        });
    });
  };

  return (
    <CardWrapper
      headerTitle="Nueva Cuenta"
      headerLabel="Completa el siguiente formulario para crear una cuenta:"
      backButtonLabel="Ya tienes cuenta? Inicia Sesión"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
          <form 
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6"
              >
                <div className="space-y-4">
                <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre Completo:</FormLabel>
                            <FormControl>
                              <Input
                                  {...field}
                                  disabled={isPending}
                                  placeholder="John Doe"
                              />
                            </FormControl>
                            <FormMessage/>
                          </FormItem>
                        )}
                    />
                <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email:</FormLabel>
                            <FormControl>
                              <Input
                                  {...field}
                                  disabled={isPending}
                                  placeholder="john.doe@example.com"
                                  type="email"
                              />
                            </FormControl>
                            <FormMessage/>
                          </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contraseña:</FormLabel>
                            <FormControl>
                              <Input
                                  {...field}
                                  disabled={isPending}
                                  placeholder="********"
                                  type="password"
                              />
                            </FormControl>
                            <FormMessage/>
                          </FormItem>
                        )}
                    />
                </div>
                <FormError message={error}/>
                <FormSuccess message={success}/>

                <Button
                    disabled={isPending}
                    type="submit"
                    className="w-full"
                >
                        Crear Cuenta
                </Button>
          </form>

      </Form>
    </CardWrapper>
  );
}
