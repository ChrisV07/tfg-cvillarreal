"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { LoginSchema } from "@/src/schemas";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";
import { FormSuccess } from "@/components/ui/FormSuccess";


export default function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
      console.log(values);
      
  }

  return (
    <CardWrapper
      headerTitle="🔐 Iniciar Sesión"
      headerLabel="Comenza a Administrar tu Restaurante Iniciando Sesión en el siguiente formulario:"
      backButtonLabel="No tienes cuenta? Registrate"
      backButtonHref="/auth/register"
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
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email:</FormLabel>
                            <FormControl>
                              <Input
                                  {...field}
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
                                  placeholder="********"
                                  type="password"
                              />
                            </FormControl>
                            <FormMessage/>
                          </FormItem>
                        )}
                    />
                </div>
                <FormError message=""/>
                <FormSuccess message=""/>

                <Button
                    type="submit"
                    className="w-full"
                >
                        Iniciar Sesión
                </Button>
          </form>

      </Form>
    </CardWrapper>
  );
}
