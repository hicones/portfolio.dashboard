import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "react-cookie";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const authSchema = z.object({
  user: z.string({
    required_error: "Insira o seu usuário.",
  }),
  password: z
    .string({
      required_error: "Insira uma senha.",
    })
    .min(6, {
      message: "A senha deve ter no mínimo 6 caracteres.",
    }),
});

export type AuthSchema = z.infer<typeof authSchema>;

const EXPIRES = new Date(Date.now() + 12 * 60 * 60 * 1000); // 12 hours

export function AuthPage() {
  const navigate = useNavigate();
  const [, setCookies] = useCookies();
  const form = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      user: "",
      password: "",
    },
  });

  const { handleSubmit, control } = form;

  const onSubmit = (data: AuthSchema) => {
    setCookies(
      "hicones-dashboard",
      {
        email: data.user,
        password: data.password,
      },
      {
        expires: EXPIRES,
      }
    );

    navigate("/");
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Insira seu usuário abaixo para fazer login.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit(onSubmit)();
            }
          }}
        >
          <Controller
            name="user"
            control={control}
            render={({ field, fieldState }) => (
              <fieldset className="grid gap-2">
                <Label htmlFor="email">Usuário</Label>
                <Input id="email" type="email" required {...field} />
                {fieldState.error ? (
                  <span className="text-xs text-red-500">
                    {fieldState.error.message}
                  </span>
                ) : (
                  <div className="h-4" />
                )}
              </fieldset>
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <fieldset className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" required {...field} />
                {fieldState.error ? (
                  <span className="text-xs text-red-500">
                    {fieldState.error.message}
                  </span>
                ) : (
                  <div className="h-4" />
                )}
              </fieldset>
            )}
          />
        </form>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            handleSubmit(onSubmit)();
          }}
          type="submit"
          className="w-full"
        >
          Entrar
        </Button>
      </CardFooter>
    </Card>
  );
}
